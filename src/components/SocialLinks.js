import React from 'react';
import './SocialLinks.css';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const SocialLinks = () => {
    const socialLinks = [
        { id: 1, name: 'Facebook', url: 'https://facebook.com/ncvalkyries', icon: <Facebook /> },
        { id: 2, name: 'Instagram', url: 'https://instagram.com/ncvalkyries', icon: <Instagram /> },
        { id: 3, name: 'Twitter', url: 'https://twitter.com/ncvalkyries', icon: <Twitter /> },
        { id: 4, name: 'YouTube', url: 'https://youtube.com/ncvalkyries', icon: <Youtube /> },
    ];

    return (
        <section className="social-links">
            <div className="container">
                <h2>Connect With Us</h2>
                <p className="social-description">
                    Follow us on social media to stay updated with game schedules, tournament results,
                    team announcements, and highlights from our amazing players!
                </p>

                <div className="social-icons-container">
                    {socialLinks.map((social) => (
                        <a
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon-link"
                            key={social.id}
                            data-platform={social.name}
                        >
                            <div className="social-icon">{social.icon}</div>
                        </a>
                    ))}
                </div>

                <div className="contact-info">
                    <p>For inquiries about joining our team or sponsorship opportunities:</p>
                    <p className="email">
                        Email: <a href="mailto:coach@ncvalkyries.com">coach@ncvalkyries.com</a>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default SocialLinks;
