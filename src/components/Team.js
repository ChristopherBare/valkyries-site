import React from 'react';
import './Team.css';

const Team = () => {
    const playersData = [
        { id: 1, name: 'TBD', birthday: '2015-06-12', position: 'Pitcher' },
        { id: 2, name: 'Aurora', birthday:'2015-02-06', position: 'Catcher | Utility', focus: 'top' }, //focus is optional so that you can tweak the image position
        { id: 3, name: 'Jocelynn', birthday: '2015-02-28', position: '1st Base | Utility' },
        { id: 4, name: 'TBD', birthday: '2015-06-12', position: '2nd Base' },
        { id: 5, name: 'TBD', birthday: '2015-06-12', position: 'Shortstop' },
        { id: 6, name: 'TBD', birthday: '2015-06-12', position: '3rd Base' },
        { id: 7, name: 'TBD', birthday: '2015-06-12', position: 'Left Field' },
        { id: 8, name: 'TBD', birthday: '2015-06-12', position: 'Center Field' },
        { id: 9, name: 'TBD', birthday: '2015-06-12', position: 'Right Field' },
        { id: 10, name: 'TBD', birthday: '2015-06-12', position: 'Utility' },
        { id: 11, name: 'TBD', birthday: '2015-06-12', position: 'Pitcher/Infield' },
        { id: 12, name: 'TBD', birthday: '2015-06-12', position: 'Outfield/Catcher' }
    ];

    // Helper function to create a public image URL based on the player's name
    const getPlayerImage = (name) => {
        // Replace spaces with underscores or dashes if your files are named that way
        const formattedName = name.replace(/\s+/g, '_');
        return `/images/players/${formattedName}.jpg`;
    };

    const calculateAge = (birthday) => {
        const birthDate = new Date(birthday);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--; // birthday hasn’t occurred yet this year
        }
        return age;
    };


    return (
        <section className="team">
            <div className="container">
                <h2>Meet Our Team</h2>
                <div className="team-container">
                    {playersData.map(player => (
                        <div className="player-card" key={player.id}>
                            <div className="player-image">
                                <img
                                    src={getPlayerImage(player.name)}
                                    alt={player.name}
                                    style={{
                                        objectPosition:
                                            player.focus === 'top'
                                                ? '50% 20%'
                                                : player.focus === 'bottom'
                                                    ? '50% 80%'
                                                    : '50% 50%'
                                    }}
                                    onError={(e) => {
                                        // Fallback to initials if the image is missing
                                        e.target.onerror = null;
                                        e.target.style.display = 'none';
                                        e.target.parentNode.querySelector('.player-initials').style.display = 'flex';
                                    }}
                                />
                                <div className="player-initials" style={{ display: 'none' }}>
                                    {player.name.split(' ').map(n => n[0]).join('')}
                                </div>
                            </div>
                            <div className="player-info">
                                <h3>{player.name}</h3>
                                <p className="player-position">{player.position}</p>
                                <p className="player-age">Age: {calculateAge(player.birthday)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;
