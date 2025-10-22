provider "aws" {
  region = "us-east-1"
}

# Random UUID for dev environment path
resource "random_uuid" "dev_path" {}

# S3 bucket for website hosting
resource "aws_s3_bucket" "website_bucket" {
  bucket = "valkyries-site-bucket"
  force_destroy = true

  tags = {
    Name        = "Valkyries Site Bucket"
    Environment = "Production"
  }
  
  lifecycle {
    prevent_destroy = true
    ignore_changes = [bucket]
  }
}

# S3 bucket ownership controls
resource "aws_s3_bucket_ownership_controls" "website_bucket" {
  bucket = aws_s3_bucket.website_bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

# S3 bucket public access block
resource "aws_s3_bucket_public_access_block" "website_bucket" {
  bucket = aws_s3_bucket.website_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# S3 bucket ACL
resource "aws_s3_bucket_acl" "website_bucket" {
  depends_on = [
    aws_s3_bucket_ownership_controls.website_bucket,
    aws_s3_bucket_public_access_block.website_bucket,
  ]

  bucket = aws_s3_bucket.website_bucket.id
  acl    = "private"
}


# CloudFront origin access identity
resource "aws_cloudfront_origin_access_identity" "oai" {
  comment = "OAI for Valkyries Site"
}

# S3 bucket policy
resource "aws_s3_bucket_policy" "website_bucket" {
  bucket = aws_s3_bucket.website_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "CloudFrontReadGetObject"
        Effect    = "Allow"
        Principal = {
          AWS = "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity ${aws_cloudfront_origin_access_identity.oai.id}"
        }
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.website_bucket.arn}/*"
      }
    ]
  })
}

# CloudFront distribution
resource "aws_cloudfront_distribution" "website_distribution" {
  origin {
    domain_name = aws_s3_bucket.website_bucket.bucket_regional_domain_name
    origin_id   = aws_s3_bucket.website_bucket.bucket
    
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.oai.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  price_class         = "PriceClass_100" # Use only North America and Europe edge locations to keep costs low

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = aws_s3_bucket.website_bucket.bucket

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    compress               = true
  }

  # Cache behavior for development environment
  ordered_cache_behavior {
    path_pattern     = "/${random_uuid.dev_path.result}/dev/*"
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = aws_s3_bucket.website_bucket.bucket

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    compress               = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  # Handle SPA routing by redirecting 404s to index.html
  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }
  
  # Handle 403 errors (Forbidden) by redirecting to index.html
  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }
}

# Output values
output "website_bucket_name" {
  value = aws_s3_bucket.website_bucket.bucket
}

output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.website_distribution.id
}

output "cloudfront_distribution_domain" {
  value = aws_cloudfront_distribution.website_distribution.domain_name
}

output "website_url" {
  value = "https://${aws_cloudfront_distribution.website_distribution.domain_name}"
  description = "The URL of the website"
}

output "dev_path_uuid" {
  value = random_uuid.dev_path.result
  sensitive = true
}

terraform {
  backend "s3" {
    bucket = "valkyries-site-terraform-state"
    key    = "site/terraform.tfstate"
    region = "us-east-1"
    dynamodb_table = "valkyries-site-terraform-lock"
  }
}
