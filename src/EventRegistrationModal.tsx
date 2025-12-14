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
        // Only show error if it's a validation error (400) or already registered
        if (result.message.includes('already registered') || result.message.includes('required') || result.message.includes('not found')) {
          setMessage({ type: 'error', text: result.message });
        } else {
          // For server busy errors, show a gentle message
          setMessage({ type: 'error', text: 'Please try again in a moment.' });
        }
      }
    } catch (error) {
      // Don't show error - just ask to retry
      setMessage({ type: 'error', text: 'Please try again in a moment.' });
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
        // Only show error if it's a validation error (400) or already registered
        if (result.message.includes('already registered') || result.message.includes('required') || result.message.includes('not found')) {
          setMessage({ type: 'error', text: result.message });
        } else {
          // For server busy errors, show a gentle message
          setMessage({ type: 'error', text: 'Please try again in a moment.' });
        }
      }
    } catch (error) {
      // Don't show error - just ask to retry
      setMessage({ type: 'error', text: 'Please try again in a moment.' });
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

  // Input class styles
  const inputClass = "w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300 backdrop-blur-sm";
  const labelClass = "block text-amber-400 font-semibold mb-2 text-sm md:text-base";

  if (registrationSuccess) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[10001] p-4" onClick={onClose}>
        <div 
          className="bg-gradient-to-br from-[#522566] via-[#2596be] via-50% to-[#c96ba1] rounded-3xl w-full max-w-[700px] max-h-[90vh] overflow-y-auto border border-white/30 shadow-[0_20px_60px_rgba(82,37,102,0.5)] animate-[modalSlideIn_0.3s_ease]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center p-8 md:p-16">
            <div className="w-24 h-24 md:w-[100px] md:h-[100px] bg-gradient-to-br from-[#e48ab9] to-[#c96ba1] rounded-full flex items-center justify-center text-5xl md:text-6xl text-white mx-auto mb-6 md:mb-8 shadow-[0_10px_40px_rgba(228,138,185,0.4)] animate-pulse">
              ✓
            </div>
            <h2 className="text-amber-400 text-xl md:text-2xl font-bold mb-6 md:mb-8">🎉 Registration Successful!</h2>
            <div className="bg-white/20 p-6 md:p-8 rounded-xl border-2 border-amber-400 my-6 md:my-8">
              <p className="text-white/90 text-sm md:text-base mb-2">{registrationType === 'team' ? 'Team ID' : 'Registration ID'}</p>
              <p className="text-amber-400 text-2xl md:text-4xl font-black tracking-widest">{generatedId}</p>
            </div>
            <p className="text-white/90 text-base md:text-lg mb-6">
              A confirmation email has been sent with all details.
            </p>
            <button 
              className="px-8 md:px-10 py-3 md:py-4 bg-[#522566]/90 border-2 border-[#fdee71] rounded-xl text-white text-base md:text-lg font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(228,138,185,0.5)]"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[10001] p-2 md:p-4" onClick={onClose}>
      <div 
        className="bg-gradient-to-br from-[#522566] via-[#2596be] via-50% to-[#c96ba1] rounded-2xl md:rounded-3xl w-full max-w-[98%] md:max-w-[700px] max-h-[95vh] md:max-h-[90vh] overflow-y-auto border border-white/30 shadow-[0_20px_60px_rgba(82,37,102,0.5)] animate-[modalSlideIn_0.3s_ease]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 md:p-6 border-b border-white/20">
          <h2 className="text-white text-lg md:text-xl font-bold">Register for {event.eventName}</h2>
          <button 
            className="w-8 h-8 md:w-10 md:h-10 bg-white/10 rounded-full flex items-center justify-center text-white text-xl md:text-2xl hover:bg-white/20 transition-colors"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="p-4 md:p-8">
          {/* Registration Type Selector */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
            <button
              className={`flex-1 py-3 md:py-4 px-4 md:px-5 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 backdrop-blur-sm border-2 ${
                registrationType === 'individual'
                  ? 'bg-gradient-to-br from-amber-400 to-amber-200 border-amber-400 text-purple-700 shadow-[0_5px_20px_rgba(255,215,0,0.3)]'
                  : 'bg-white/15 border-white/30 text-white hover:bg-blue-400/25 hover:border-amber-400/60 hover:-translate-y-0.5'
              }`}
              onClick={() => setRegistrationType('individual')}
            >
              👤 Individual
            </button>
            <button
              className={`flex-1 py-3 md:py-4 px-4 md:px-5 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 backdrop-blur-sm border-2 ${
                registrationType === 'team'
                  ? 'bg-gradient-to-br from-amber-400 to-amber-200 border-amber-400 text-purple-700 shadow-[0_5px_20px_rgba(255,215,0,0.3)]'
                  : 'bg-white/15 border-white/30 text-white hover:bg-blue-400/25 hover:border-amber-400/60 hover:-translate-y-0.5'
              }`}
              onClick={() => setRegistrationType('team')}
            >
              👥 Team
            </button>
          </div>

          {message && (
            <div className={`p-4 rounded-xl mb-6 text-center font-medium ${
              message.type === 'success' 
                ? 'bg-[#e48ab9]/20 text-[#fdee71] border border-[#e48ab9]/30' 
                : 'bg-red-500/20 text-red-300 border border-red-500/30'
            }`}>
              {message.text}
            </div>
          )}

          {/* Individual Registration Form */}
          {registrationType === 'individual' && (
            <form onSubmit={handleIndividualSubmit} className="space-y-4 md:space-y-5">
              <div>
                <label className={labelClass}>User ID (Mahotsav ID) *</label>
                <input
                  type="text"
                  value={individualData.userId}
                  onChange={(e) => setIndividualData({ ...individualData, userId: e.target.value })}
                  placeholder="Enter your Mahotsav ID (e.g., MH26000001)"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Full Name *</label>
                <input
                  type="text"
                  value={individualData.participantName}
                  onChange={(e) => setIndividualData({ ...individualData, participantName: e.target.value })}
                  placeholder="Enter your full name"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Email *</label>
                <input
                  type="email"
                  value={individualData.email}
                  onChange={(e) => setIndividualData({ ...individualData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Phone Number</label>
                <input
                  type="tel"
                  value={individualData.phone}
                  onChange={(e) => setIndividualData({ ...individualData, phone: e.target.value })}
                  placeholder="10-digit mobile number"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>College/University Name</label>
                <input
                  type="text"
                  value={individualData.college}
                  onChange={(e) => setIndividualData({ ...individualData, college: e.target.value })}
                  placeholder="Enter your college/university name"
                  className={inputClass}
                />
              </div>
              <button 
                type="submit" 
                className="w-full py-4 bg-gradient-to-br from-amber-400 to-amber-200 rounded-xl text-purple-700 text-base md:text-lg font-bold cursor-pointer transition-all duration-300 shadow-[0_5px_20px_rgba(255,215,0,0.3)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(255,215,0,0.5)] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isSubmitting}
              >
                {isSubmitting ? '⏳ Registering...' : '✅ Complete Registration'}
              </button>
            </form>
          )}

          {/* Team Registration Form */}
          {registrationType === 'team' && (
            <form onSubmit={handleTeamSubmit} className="space-y-6">
              {/* Team Details Section */}
              <div className="p-4 md:p-5 bg-blue-500/15 rounded-xl border border-white/30 backdrop-blur-sm">
                <h3 className="text-amber-400 text-lg md:text-xl font-bold mb-4">Team Details</h3>
                <div>
                  <label className={labelClass}>Team Name *</label>
                  <input
                    type="text"
                    value={teamData.teamName}
                    onChange={(e) => setTeamData({ ...teamData, teamName: e.target.value })}
                    placeholder="Enter team name"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              {/* Captain Details Section */}
              <div className="p-4 md:p-5 bg-blue-500/15 rounded-xl border border-white/30 backdrop-blur-sm">
                <h3 className="text-amber-400 text-lg md:text-xl font-bold mb-4">Captain Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={labelClass}>User ID *</label>
                    <input
                      type="text"
                      value={teamData.captain.userId}
                      onChange={(e) => setTeamData({ ...teamData, captain: { ...teamData.captain, userId: e.target.value } })}
                      placeholder="Mahotsav ID"
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Name *</label>
                    <input
                      type="text"
                      value={teamData.captain.name}
                      onChange={(e) => setTeamData({ ...teamData, captain: { ...teamData.captain, name: e.target.value } })}
                      placeholder="Captain name"
                      className={inputClass}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={labelClass}>Email *</label>
                    <input
                      type="email"
                      value={teamData.captain.email}
                      onChange={(e) => setTeamData({ ...teamData, captain: { ...teamData.captain, email: e.target.value } })}
                      placeholder="Captain email"
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Phone</label>
                    <input
                      type="tel"
                      value={teamData.captain.phone}
                      onChange={(e) => setTeamData({ ...teamData, captain: { ...teamData.captain, phone: e.target.value } })}
                      placeholder="Phone number"
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>College/University</label>
                  <input
                    type="text"
                    value={teamData.captain.college}
                    onChange={(e) => setTeamData({ ...teamData, captain: { ...teamData.captain, college: e.target.value } })}
                    placeholder="College/University name"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Team Members Section */}
              <div className="p-4 md:p-5 bg-blue-500/15 rounded-xl border border-white/30 backdrop-blur-sm">
                <h3 className="text-amber-400 text-lg md:text-xl font-bold mb-4">Team Members ({teamMembers.length})</h3>
                
                {/* Display added members */}
                {teamMembers.length > 0 && (
                  <div className="mb-4 max-h-[300px] overflow-y-auto space-y-3">
                    {teamMembers.map((member, index) => (
                      <div key={index} className="flex justify-between items-center p-4 bg-white/15 rounded-xl border-l-4 border-amber-400">
                        <div>
                          <strong className="text-amber-400 block mb-1">{member.name}</strong>
                          <p className="text-amber-400/80 text-sm">{member.userId} • {member.email}</p>
                        </div>
                        <button 
                          type="button" 
                          onClick={() => removeMember(index)} 
                          className="w-9 h-9 bg-red-500/30 border border-red-500/50 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-red-500/50 hover:scale-110"
                        >
                          ❌
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add member form */}
                <div className="p-4 bg-[#522566]/40 rounded-xl border-2 border-dashed border-white/40 backdrop-blur-sm">
                  <h4 className="text-amber-400 font-semibold mb-3">Add Team Member</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <input
                      type="text"
                      value={currentMember.userId}
                      onChange={(e) => setCurrentMember({ ...currentMember, userId: e.target.value })}
                      placeholder="User ID *"
                      className={inputClass}
                    />
                    <input
                      type="text"
                      value={currentMember.name}
                      onChange={(e) => setCurrentMember({ ...currentMember, name: e.target.value })}
                      placeholder="Name *"
                      className={inputClass}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <input
                      type="email"
                      value={currentMember.email}
                      onChange={(e) => setCurrentMember({ ...currentMember, email: e.target.value })}
                      placeholder="Email *"
                      className={inputClass}
                    />
                    <input
                      type="tel"
                      value={currentMember.phone}
                      onChange={(e) => setCurrentMember({ ...currentMember, phone: e.target.value })}
                      placeholder="Phone"
                      className={inputClass}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={currentMember.college}
                      onChange={(e) => setCurrentMember({ ...currentMember, college: e.target.value })}
                      placeholder="College/University"
                      className={inputClass}
                    />
                  </div>
                  <button 
                    type="button" 
                    onClick={addTeamMember} 
                    className="w-full py-3 bg-gradient-to-br from-[#e48ab9] to-[#c96ba1] rounded-xl text-white font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_5px_20px_rgba(228,138,185,0.4)]"
                  >
                    ➕ Add Member
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full py-4 bg-gradient-to-br from-amber-400 to-amber-200 rounded-xl text-purple-700 text-base md:text-lg font-bold cursor-pointer transition-all duration-300 shadow-[0_5px_20px_rgba(255,215,0,0.3)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(255,215,0,0.5)] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isSubmitting}
              >
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
