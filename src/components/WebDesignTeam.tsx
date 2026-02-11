import React, { useState } from 'react';
import './WebDesignTeam.css';

const WebDesignTeam: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const teamMembers = [
        { img: 'a.jpeg', role: 'Team Leader' },
        { img: 'g.jpeg', role: 'Team Member' },
        { img: 'd.jpeg', role: 'Team Member' },
        { img: 'c.jpeg', role: 'Team Member' },
        { img: 'e.jpeg', role: 'Team Member' },
        { img: 'f.jpeg', role: 'Team Member' },
        { img: 'b.jpeg', role: 'Team Member' },
        { img: 'h.jpeg', role: 'Team Member' }
    ];

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
        document.body.style.overflow = 'hidden';
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto';
    };

    return (
        <div className="web-design-team-section">

            <div style={{
                textAlign: 'center',
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '0.8rem',
                marginBottom: '10px',
                letterSpacing: '1px',
                textTransform: 'uppercase'
            }}>
                Web Design Team
            </div>

            <div className="web-design-team-container">
                {teamMembers.map((member, index) => (
                    <div key={index} className="web-design-member-wrapper">
                        <img
                            src={`/${member.img}`}
                            alt={`${member.role} ${index + 1}`}
                            className="web-design-member-icon"
                            onClick={() => handleImageClick(member.img)}
                        />
                        <div className="web-design-member-role">{member.role}</div>
                    </div>
                ))}
            </div>

            {selectedImage && (
                <div className="team-modal-overlay" onClick={handleCloseModal}>
                    <div className="team-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-button" onClick={handleCloseModal}>×</button>
                        <img src={`/${selectedImage}`} alt="Team Member Large" />
                    </div>
                </div>
            )}

        </div>
    );
};

export default WebDesignTeam;
