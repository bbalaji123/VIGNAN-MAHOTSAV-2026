import React, { useState } from 'react';
import { registerIndividualEvent, registerTeamEvent, type Event, type TeamMember } from './services/api';

interface EventRegistrationModalProps {
  event: Event;
  onClose: () => void;
}

const EventRegistrationModal: React.FC<EventRegistrationModalProps> = ({ event, onClose }) => {
  const [registrationType, setRegistrationType] = useState<'individual' | 'team'>('individual');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [generatedId, setGeneratedId] = useState('');

  // Individual registration form
  const [individualData, setIndividualData] = useState({
    userId: '',
    participantName: '',
    email: '',
    phone: '',
    college: ''
  });

  // Team registration form
  const [teamData, setTeamData] = useState({
    teamName: '',
    captain: {
      userId: '',
      name: '',
      email: '',
      phone: '',
      college: ''
    }
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [currentMember, setCurrentMember] = useState({
    userId: '',
    name: '',
    email: '',
    phone: '',
    college: ''
  });

  const handleIndividualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    if (!individualData.userId || !individualData.participantName || !individualData.email) {
      setMessage({ type: 'error', text: 'User ID, Name, and Email are required!' });
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await registerIndividualEvent({
        eventId: event._id,
        ...individualData
      });

      if (result.success) {
        setGeneratedId(result.data?.registrationId || '');
        setRegistrationSuccess(true);
        setMessage({ type: 'success', text: result.message });
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTeamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    if (!teamData.teamName || !teamData.captain.userId || !teamData.captain.name || !teamData.captain.email) {
      setMessage({ type: 'error', text: 'Team Name and Captain details are required!' });
      setIsSubmitting(false);
      return;
    }

    if (teamMembers.length === 0) {
      setMessage({ type: 'error', text: 'Please add at least one team member!' });
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await registerTeamEvent({
        eventId: event._id,
        teamName: teamData.teamName,
        captain: teamData.captain,
        teamMembers: teamMembers
      });

      if (result.success) {
        setGeneratedId(result.data?.teamId || '');
        setRegistrationSuccess(true);
        setMessage({ type: 'success', text: result.message });
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Team registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addTeamMember = () => {
    if (!currentMember.userId || !currentMember.name || !currentMember.email) {
      setMessage({ type: 'error', text: 'Member User ID, Name, and Email are required!' });
      return;
    }

    setTeamMembers([...teamMembers, currentMember]);
    setCurrentMember({ userId: '', name: '', email: '', phone: '', college: '' });
    setMessage(null);
  };

  const removeMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  if (registrationSuccess) {
    return (
      <div className="login-modal-overlay" onClick={onClose}>
        <div className="event-registration-modal" onClick={(e) => e.stopPropagation()}>
          <div className="registration-success">
            <div className="success-icon-large">✓</div>
            <h2>🎉 Registration Successful!</h2>
            <div className="generated-id-box">
              <p className="id-label">{registrationType === 'team' ? 'Team ID' : 'Registration ID'}</p>
              <p className="id-value">{generatedId}</p>
            </div>
            <p className="success-message">
              A confirmation email has been sent with all details.
            </p>
            <button className="close-success-btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="event-registration-modal" onClick={(e) => e.stopPropagation()}>
        <div className="login-modal-header">
          <h2>Register for {event.eventName}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="event-registration-body">
          {/* Registration Type Selector */}
          <div className="registration-type-selector">
            <button
              className={`type-btn ${registrationType === 'individual' ? 'active' : ''}`}
              onClick={() => setRegistrationType('individual')}
            >
              👤 Individual
            </button>
            <button
              className={`type-btn ${registrationType === 'team' ? 'active' : ''}`}
              onClick={() => setRegistrationType('team')}
            >
              👥 Team
            </button>
          </div>

          {message && (
            <div className={`submit-message ${message.type}`}>
              {message.text}
            </div>
          )}

          {/* Individual Registration Form */}
          {registrationType === 'individual' && (
            <form onSubmit={handleIndividualSubmit}>
              <div className="form-group">
                <label>User ID (Mahotsav ID) *</label>
                <input
                  type="text"
                  value={individualData.userId}
                  onChange={(e) => setIndividualData({ ...individualData, userId: e.target.value })}
                  placeholder="Enter your Mahotsav ID (e.g., MH26000001)"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  value={individualData.participantName}
                  onChange={(e) => setIndividualData({ ...individualData, participantName: e.target.value })}
                  placeholder="Enter your full name"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={individualData.email}
                  onChange={(e) => setIndividualData({ ...individualData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={individualData.phone}
                  onChange={(e) => setIndividualData({ ...individualData, phone: e.target.value })}
                  placeholder="10-digit mobile number"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>College/University Name</label>
                <input
                  type="text"
                  value={individualData.college}
                  onChange={(e) => setIndividualData({ ...individualData, college: e.target.value })}
                  placeholder="Enter your college/university name"
                  className="form-input"
                />
              </div>
              <button type="submit" className="register-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? '⏳ Registering...' : '✅ Complete Registration'}
              </button>
            </form>
          )}

          {/* Team Registration Form */}
          {registrationType === 'team' && (
            <form onSubmit={handleTeamSubmit}>
              <div className="form-section">
                <h3>Team Details</h3>
                <div className="form-group">
                  <label>Team Name *</label>
                  <input
                    type="text"
                    value={teamData.teamName}
                    onChange={(e) => setTeamData({ ...teamData, teamName: e.target.value })}
                    placeholder="Enter team name"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Captain Details</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>User ID *</label>
                    <input
                      type="text"
                      value={teamData.captain.userId}
                      onChange={(e) => setTeamData({ ...teamData, captain: { ...teamData.captain, userId: e.target.value } })}
                      placeholder="Mahotsav ID"
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Name *</label>
                    <input
                      type="text"
                      value={teamData.captain.name}
                      onChange={(e) => setTeamData({ ...teamData, captain: { ...teamData.captain, name: e.target.value } })}
                      placeholder="Captain name"
                      className="form-input"
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      value={teamData.captain.email}
                      onChange={(e) => setTeamData({ ...teamData, captain: { ...teamData.captain, email: e.target.value } })}
                      placeholder="Captain email"
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={teamData.captain.phone}
                      onChange={(e) => setTeamData({ ...teamData, captain: { ...teamData.captain, phone: e.target.value } })}
                      placeholder="Phone number"
                      className="form-input"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>College/University</label>
                  <input
                    type="text"
                    value={teamData.captain.college}
                    onChange={(e) => setTeamData({ ...teamData, captain: { ...teamData.captain, college: e.target.value } })}
                    placeholder="College/University name"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Team Members ({teamMembers.length})</h3>
                
                {/* Display added members */}
                {teamMembers.length > 0 && (
                  <div className="team-members-list">
                    {teamMembers.map((member, index) => (
                      <div key={index} className="team-member-card">
                        <div>
                          <strong>{member.name}</strong>
                          <p>{member.userId} • {member.email}</p>
                        </div>
                        <button type="button" onClick={() => removeMember(index)} className="remove-member-btn">
                          ❌
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add member form */}
                <div className="add-member-form">
                  <h4>Add Team Member</h4>
                  <div className="form-row">
                    <input
                      type="text"
                      value={currentMember.userId}
                      onChange={(e) => setCurrentMember({ ...currentMember, userId: e.target.value })}
                      placeholder="User ID *"
                      className="form-input"
                    />
                    <input
                      type="text"
                      value={currentMember.name}
                      onChange={(e) => setCurrentMember({ ...currentMember, name: e.target.value })}
                      placeholder="Name *"
                      className="form-input"
                    />
                  </div>
                  <div className="form-row">
                    <input
                      type="email"
                      value={currentMember.email}
                      onChange={(e) => setCurrentMember({ ...currentMember, email: e.target.value })}
                      placeholder="Email *"
                      className="form-input"
                    />
                    <input
                      type="tel"
                      value={currentMember.phone}
                      onChange={(e) => setCurrentMember({ ...currentMember, phone: e.target.value })}
                      placeholder="Phone"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      value={currentMember.college}
                      onChange={(e) => setCurrentMember({ ...currentMember, college: e.target.value })}
                      placeholder="College/University"
                      className="form-input"
                    />
                  </div>
                  <button type="button" onClick={addTeamMember} className="add-member-btn">
                    ➕ Add Member
                  </button>
                </div>
              </div>

              <button type="submit" className="register-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? '⏳ Registering Team...' : '✅ Complete Team Registration'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventRegistrationModal;
