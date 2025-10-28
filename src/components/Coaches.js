import React from 'react';
import './Coaches.css';

const Coaches = () => {
    const coachesData = [
        {
            id: 1,
            name: 'Jessica Bare',
            role: 'Head Coach',
            bio: 'Jessica brings a lifelong love of softball and years of experience both on and off the field. A former high school standout who excelled as a catcher and outfielder, Jessica combines her technical knowledge with a deep passion for player development. She began coaching at the local recreational level, where her leadership and ability to connect with young athletes quickly stood out. Her dedication and expertise led to her being recruited as a catching coach—an area where her experience truly shines.\n' +
               'Her coaching philosophy centers on effort, respect, and a genuine love for the sport of softball.',
            imageUrl: '/images/coaches/Jessica.jpg',
            focus: 'top'
        },
        {
            id: 2,
            name: 'Tiana Newell',
            role: 'Assistant Coach',
            bio: 'Bio coming soon...',
            imageUrl: '/images/coaches/Tiana.jpg',
            focus: 'bottom'
        },
        {
            id: 3,
            name: 'Katie Comier',
            role: 'Assistant Coach',
            bio: 'Coach Katie brings 4+ years of youth coaching and a lifelong love of the game. A former Little League softball player who also coached Little League baseball, she’s played in adult leagues in San Diego and Charlotte and lives her motto: practice how you play. Known for skill-building, high energy, and hype playlists, she treats every roster like family and can’t wait to help this team grow confident, play smart, and celebrate every win.\n',
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
