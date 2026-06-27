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
            logoColor: '#C29B0C',
            players: [
                { id: 1, firstName: 'Josephine', lastName: 'Steutterman', birthday: '2015-05-25', position: 'Pitcher | Utility', focus: 'top' },
                { id: 2, firstName: 'Aurora', lastName: 'Bare', birthday:'2015-02-06', position: 'Catcher | Utility', focus: 'top' },
                { id: 3, firstName: 'Jocelynn', lastName: 'Carlson', birthday: '2015-02-28', position: 'Catcher | Utility' },
                { id: 4, firstName: 'Riley', lastName: 'Beagle', birthday: '2015-08-06', position: 'Pitcher | Utility' },
                { id: 5, firstName: 'Lakyn', lastName: 'Furdella', birthday: '2015-02-09', position: 'Utility' },
                { id: 6, firstName: 'Lily', lastName: 'Yura', birthday: '2014-11-11', position: 'Pitcher | Utility' },
                { id: 7, firstName: 'McKenzie', lastName: 'Jordan', birthday: '2015-01-28', position: 'Utility', focus: 'top' },
                { id: 8, firstName: 'Eliana', lastName: 'Kuster', birthday: '2015-02-06', position: 'Catcher | Utility' },
                { id: 9, firstName: 'Amalia', lastName: 'Coe', birthday: '2015-12-02', position: 'Utility' },
                { id: 10, firstName: 'Gia', lastName: 'Risavi', birthday: '2014-09-14', position: 'Utility', focus: 'top' }
            ]
        },
        green: {
            id: 'green',
            name: 'Valkyries Green',
            color: '#005035',
            logoColor: '#C29B0C',
            players: [
                { id: 11, firstName: 'Miranda', lastName: 'Collett', birthday: '2016-09-10', position: 'Catcher | Utility' },
                { id: 12, firstName: 'Amelia', lastName: 'Augustine', birthday: '2015-09-08', position: 'Catcher | Utility' },
                { id: 13, firstName: 'Sadie', lastName: 'Landman', birthday: '2016-06-09', position: 'Pitcher | Utility' },
                { id: 14, firstName: 'Mia', lastName: 'Jordan', birthday: '2017-08-16', position: 'Utility' },
                { id: 15, firstName: 'Elizah', lastName: 'Gaddie', birthday: '2017-06-12', position: 'Catcher | Utility' },
                { id: 16, firstName: 'Athena', lastName: 'Garcia', birthday: '2015-11-11', position: 'Pitcher | Utility' },
                { id: 17, firstName: 'Jordyn', lastName: 'Bentley', birthday: '2016-04-12', position: 'Pitcher | Utility' },
                { id: 18, firstName: 'Kennadi', lastName: 'Johnson', birthday: '2016-03-09', position: 'Utility' },
                { id: 19, firstName: 'Jayden', lastName: 'May', birthday: '2017-06-14', position: 'Catcher | Utility' },
                { id: 20, firstName: 'Olivia', lastName: 'Perez', birthday: '2015-09-15', position: 'Catcher | Utility' },
            ]
        }
    };

    // Helper function to create a public image URL based on the player's name
    const getPlayerImage = (firstName, lastName) => {
        const fullName = `${firstName}_${lastName}`;
        // Replace spaces with underscores if they exist in names
        const formattedName = fullName.replace(/\s+/g, '_');
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
                            src={getPlayerImage(player.firstName, player.lastName)}
                            alt={player.firstName}
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
                            {player.firstName[0]}{player.lastName[0]}
                        </div>
                    </div>
                    <div className="player-info">
                        <h3>{player.firstName}</h3>
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
                <h2>Meet Our Teams</h2>

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
                                <div
                                    className="team-logo-image opacity-90 group-hover:opacity-100 transition"
                                    style={team.logoColor ? {
                                        mask: 'url(/VALKYRIE_LOGO.svg) center/contain no-repeat',
                                        WebkitMask: 'url(/VALKYRIE_LOGO.svg) center/contain no-repeat',
                                        backgroundColor: team.logoColor
                                    } : {}}
                                >
                                    {!team.logoColor && (
                                        <img
                                            src="/VALKYRIE_LOGO.svg"
                                            alt={team.name}
                                            className="w-full h-full object-contain"
                                        />
                                    )}
                                </div>
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
