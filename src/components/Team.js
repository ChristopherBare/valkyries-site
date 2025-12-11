import React, { useState, useEffect } from 'react';
import './Team.css';

const Team = () => {
    const [activeTeam, setActiveTeam] = useState(null);
    const [isClosing, setIsClosing] = useState(false);
    const [displayedTeam, setDisplayedTeam] = useState(null);

    const teamsData = {
        blue: {
            id: 'blue',
            name: 'Valkyries Blue',
            color: '#87CEEB',
            players: [
                { id: 1, name: 'Sawyer', birthday: '2015-05-09', position: 'Pitcher | Utility' },
                { id: 2, name: 'Aurora', birthday:'2015-02-06', position: 'Catcher | Utility', focus: 'top' },
                { id: 3, name: 'Jocelynn', birthday: '2015-02-28', position: 'Catcher | Utility' },
                { id: 4, name: 'Josephine', birthday: '2015-05-25', position: 'Pitcher | Utility' },
                { id: 5, name: 'Caroline', birthday: '2014-09-27', position: 'Pitcher | Utility' },
                { id: 6, name: 'Sadie', birthday: '2015-11-13', position: 'Utility' },
                { id: 7, name: 'Lily', birthday: '2014-11-11', position: 'Pitcher | Utility' },
                { id: 8, name: 'McKenzie', birthday: '2015-01-28', position: 'Pitcher | Catcher | Utility' },
                { id: 9, name: 'Eliana', birthday: '2015-02-06', position: 'Catcher | Utility' },
                { id: 10, name: 'Elli', birthday: '2014-11-18', position: 'Pitcher | Utility' },
                { id: 11, name: 'Amalia', birthday: '2015-12-02', position: 'Utility' },
                { id: 12, name: 'Gia', birthday: '2014-09-14', position: 'Utility' }
            ]
        },
        green: {
            id: 'green',
            name: 'Valkyries Green',
            color: '#90EE90',
            players: [
                { id: 13, name: 'Player One', birthday: '2015-03-15', position: 'Pitcher | Utility' },
                { id: 14, name: 'Player Two', birthday: '2015-06-20', position: 'Catcher | Utility' },
                { id: 15, name: 'Player Three', birthday: '2014-12-10', position: 'Utility' },
                { id: 16, name: 'Player Four', birthday: '2015-04-25', position: 'Pitcher | Utility' },
                { id: 17, name: 'Player Five', birthday: '2015-08-05', position: 'Catcher | Utility' },
                { id: 18, name: 'Player Six', birthday: '2014-10-30', position: 'Utility' },
                { id: 19, name: 'Player Seven', birthday: '2015-01-18', position: 'Pitcher | Utility' },
                { id: 20, name: 'Player Eight', birthday: '2015-07-12', position: 'Catcher | Utility' },
                { id: 21, name: 'Player Nine', birthday: '2014-11-22', position: 'Utility' },
                { id: 22, name: 'Player Ten', birthday: '2015-05-08', position: 'Pitcher | Utility' },
                { id: 23, name: 'Player Eleven', birthday: '2015-02-14', position: 'Catcher | Utility' },
                { id: 24, name: 'Player Twelve', birthday: '2014-09-03', position: 'Utility' }
            ]
        }
    };

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


    const toggleTeam = (teamId) => {
        if (activeTeam === teamId) {
            // Closing the current team
            setIsClosing(true);
            setTimeout(() => {
                setActiveTeam(null);
                setDisplayedTeam(null);
                setIsClosing(false);
            }, 500); // Match animation duration
        } else if (activeTeam !== null) {
            // Switching to a different team
            setIsClosing(true);
            setTimeout(() => {
                setActiveTeam(teamId);
                setDisplayedTeam(teamId);
                setIsClosing(false);
            }, 500); // Match animation duration
        } else {
            // Opening a team
            setActiveTeam(teamId);
            setDisplayedTeam(teamId);
        }
    };

    useEffect(() => {
        if (activeTeam !== null && !isClosing) {
            setDisplayedTeam(activeTeam);
        }
    }, [activeTeam, isClosing]);

    const renderPlayerRoster = (players) => (
        <div className="team-container">
            {players.map(player => (
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
    );

    return (
        <section className="team" id="team">
            <div className="container">
                <h2>Meet Our Team</h2>

                {/* Team circles */}
                <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8">
                    {Object.values(teamsData).map((team) => (
                        <div key={team.id} className="team-circle-wrapper">
                            <button
                                type="button"
                                onClick={() => toggleTeam(team.id)}
                                className="team-circle group w-56 h-56 md:w-72 md:h-72 rounded-full flex items-center justify-center hover:shadow-md transition relative overflow-hidden"
                                style={{ backgroundColor: team.color }}
                                aria-label={`Toggle ${team.name} roster`}
                                aria-expanded={activeTeam === team.id}
                            >
                                <img
                                    src="/VALKYRIE_LOGO.svg"
                                    alt={team.name}
                                    className="team-logo-image opacity-90 group-hover:opacity-100 transition"
                                />
                            </button>

                            <div className="team-name-wrapper">
                                <h3 className="text-lg md:text-xl font-bold text-gray-800 mt-3">
                                    {team.name}
                                </h3>
                            </div>

                            {/* Caret indicator */}
                            {activeTeam === team.id && (
                                <div className="flex justify-center mt-2">
                                    <svg
                                        className="w-8 h-8 text-gray-600"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 14a1 1 0 0 1-.7-.3l-5-5a1 1 0 1 1 1.4-1.4L10 11.59l4.3-4.3a1 1 0 1 1 1.4 1.42l-5 5a1 1 0 0 1-.7.29Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Expanded team roster */}
                {(activeTeam || displayedTeam) && (
                    <div
                        className={`team-roster-expanded ${!isClosing ? 'active' : 'closing'}`}
                        key={displayedTeam || activeTeam}
                    >
                        <div className="mb-6 text-center">
                            <h3 className="text-2xl md:text-3xl font-bold" style={{ color: teamsData[displayedTeam || activeTeam].color }}>
                                {teamsData[displayedTeam || activeTeam].name} Roster
                            </h3>
                        </div>
                        {renderPlayerRoster(teamsData[displayedTeam || activeTeam].players)}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Team;
