import React from 'react';
import './Coaches.css';

const Coaches = () => {
    const coachesData = [
        {
            id: 1,
            name: 'Coach Jessica Bare',
            role: 'Head Coach',
            bio: 'Former collegiate player with 10+ years of coaching experience. Specializes in hitting and infield defense.',
            imageUrl: '/images/coaches/Jessica.jpg',
            focus: 'top'
        },
        {
            id: 2,
            name: 'Coach Tiana',
            role: 'Assistant Coach',
            bio: 'Pitching specialist with 8 years of experience developing young talent. Focuses on proper mechanics and mental game.',
            imageUrl: '/images/coaches/Tiana.jpg' // This one assumes coach2.jpg is in `public/images/`
        },
        {
            id: 3,
            name: 'Coach Katie',
            role: 'Assistant Coach',
            bio: 'Former Division I outfielder. Teaches speed, agility, and outfield skills. Certified strength and conditioning specialist.',
            imageUrl: '/images/coaches/Katie.jpg'
        }
    ];

    return (
        <section className="coaches">
            <div className="container">
                <h2>Our Coaching Staff</h2>
                <div className="coaches-container">
                    {coachesData.map(coach => (
                        <div className="coach-card" key={coach.id}>
                            <div className="coach-image-container">
                                {coach.imageUrl ? (
                                    <img src={coach.imageUrl} alt={coach.name} className="coach-image" style={{
                                        objectPosition:
                                            coach.focus === 'top'
                                                ? '50% 20%'
                                                : coach.focus === 'bottom'
                                                    ? '50% 80%'
                                                    : '50% 50%' // default center
                                    }}/>
                                ) : (
                                    <div className="coach-image-placeholder">
                    <span className="coach-initials">
                      {coach.name.split(' ').map(n => n[0]).join('')}
                    </span>
                                    </div>
                                )}
                            </div>
                            <div className="coach-info">
                                <h3>{coach.name}</h3>
                                <h4>{coach.role}</h4>
                                <p>{coach.bio}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Coaches;
