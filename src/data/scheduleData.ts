export interface ScheduleEvent {
    sno?: number;
    category: string;
    event: string;
    day: string;
    time: string;
    venue: string;
    isWorkshop?: boolean;
}

export interface DaySchedule {
    date: string;
    dayName: string;
    events: ScheduleEvent[];
}

export const scheduleData: ScheduleEvent[] = [
    { sno: 1, category: "Dance", event: "Dancing Star – Western Solo Prelims", day: "06.02.2026", time: "10:00 - 13:00", venue: "U Block Centre stage" },
    { sno: 2, category: "Dance", event: "Classical Dance Solo", day: "06.02.2026", time: "10:00 - 13:00", venue: "Sangamam Seminar Hall, A Block V Floor" },
    { sno: 3, category: "Dance", event: "Dancing Star – Western Solo Finals", day: "06.02.2026", time: "14:00 - 15:00", venue: "U Block Centre stage" },
    { category: "Dance", event: "Group Dance (10 no.)", day: "07.02.2026", time: "09:00 - 13:00", venue: "Convocation Hall" },
    { category: "Dance", event: "Dancing Jodi – Western Duo", day: "07.02.2026", time: "13:00 - 15:00", venue: "U Block Centre stage" },
    { category: "Dance", event: "Spot Dance - Jodi", day: "07.02.2026", time: "16:00 - 17:30", venue: "Convocation Hall" },
    { category: "Dance", event: "Contemporary Movement & Identity Lab by French Artist - Ms. Paulene", day: "06.02.2026", time: "14:30 - 17:30", venue: "MHP", isWorkshop: true },
    { category: "Digital Storytelling & Creative Media", event: "Short film (Offline Entries - Prelims)", day: "05.02.2026", time: "09:00 - 16:00", venue: "AGF - 04" },
    { category: "Digital Storytelling & Creative Media", event: "Short Film - Finals", day: "06.02.2026", time: "09:00 - 12:00", venue: "Sanghamitra Hall, N Block II Floor" },
    { category: "Digital Storytelling & Creative Media", event: "Mahotsav Digital Chronicle Challenge - Participaint Reporting", day: "06.02.2026", time: "10:00 - 11:00", venue: "NB 314" },
    { category: "Digital Storytelling & Creative Media", event: "Chit Chat with Champion movie Director Mr. Pradeep Advaitham", day: "06.02.2026", time: "12:00 - 13:00", venue: "Sanghamitra Hall, N Block II Floor" },
    { category: "Digital Storytelling & Creative Media", event: "Digital Poster Competition - Online", day: "07.02.2026", time: "10:00 - 11:00", venue: "NB 314" },
    { category: "Digital Storytelling & Creative Media", event: "Life in a Minute - Online - 4 no", day: "07.02.2026", time: "11:00 - 12:00", venue: "NB 314" },
    { category: "Digital Storytelling & Creative Media", event: "Theme Photography - Online", day: "07.02.2026", time: "12:00 - 13:00", venue: "NB 314" },
    { category: "Digital Storytelling & Creative Media", event: "Mahotsav Digital Chronicle Challenge", day: "07.02.2026", time: "13:00 - 16:00", venue: "NB 314" },
    { category: "Dramatics", event: "Skit (8 no.)", day: "06.02.2026", time: "10:00 - 13:00", venue: "Convocation Hall" },
    { category: "Dramatics", event: "Dialogue Dhamakha", day: "06.02.2026", time: "15:00 - 17:00", venue: "Sanghamitra Hall, N Block II Floor" },
    { category: "Dramatics", event: "Mono Action", day: "07.02.2026", time: "09:00 - 11:00", venue: "Sanghamitra Hall, N Block II Floor" },
    { category: "Dramatics", event: "On the Spot Ad making", day: "07.02.2026", time: "11:00 - 13:00", venue: "Sanghamitra Hall, N Block II Floor" },
    { category: "Dramatics", event: "Mime (6 no.)", day: "07.02.2026", time: "14:00 - 16:00", venue: "Sanghamitra Hall, N Block II Floor" },
    { category: "Fashion Design & Styling", event: "Texart (Fashion sketching)", day: "06.02.2026", time: "10:00 - 13:00", venue: "N Block - 203" },
    { category: "Fashion Design & Styling", event: "Draping Stories: One Fabric, Infinite Forms by Mr. Sourav Das", day: "06.02.2026", time: "10:00 - 13:00", venue: "MHP", isWorkshop: true },
    { category: "Fashion Design & Styling", event: "Haute Couture - Theme Ramp walk (12 no.)", day: "06.02.2026", time: "17:00 - 19:00", venue: "Convocation Hall" },
    { category: "Fashion Design & Styling", event: "T-Shirt designing", day: "07.02.2026", time: "09:00 - 11:00", venue: "H Block VGF 09" },
    { category: "Fashion Design & Styling", event: "Craft villa ( Accessory design)", day: "07.02.2026", time: "13:00 - 15:00", venue: "N Block - 203" },
    { category: "Gaming", event: "eFootball (PC) (3 no)", day: "06.02.2026", time: "10:00 - 13:00", venue: "NB 611,NB 612" },
    { category: "Gaming", event: "Smash Karts (PC) (solo)", day: "06.02.2026", time: "10:00 - 13:00", venue: "NB 613,NB 615,NB 616,NB 617" },
    { category: "Gaming", event: "VALORANT (PC) (5 no)", day: "06.02.2026", time: "14:00 - 17:00", venue: "NB 611,NB 612" },
    { category: "Gaming", event: "Counter Strike (PC) (5 no)", day: "07.02.2026", time: "10:00 - 14:00", venue: "NB 613,NB 615" },
    { category: "Literature", event: "Master Orator Round I", day: "06.02.2026", time: "10:00 - 13:00", venue: "NTR Vignan Library - III Floor" },
    { category: "Literature", event: "Telugu Vyaasa rachana", day: "06.02.2026", time: "10:00 - 13:00", venue: "Samskruthi Seminar Hall, A Block Ground Floor" },
    { category: "Literature", event: "Shayari – Hindi", day: "06.02.2026", time: "12:00 - 14:00", venue: "NTR Vignan Library - III Floor" },
    { category: "Literature", event: "Spot Creative writing", day: "06.02.2026", time: "14:00 - 16:00", venue: "Samskruthi Seminar Hall, A Block Ground Floor" },
    { category: "Literature", event: "Master Orator Round II", day: "06.02.2026", time: "14:00 - 16:00", venue: "NTR Vignan Library - III Floor" },
    { category: "Literature", event: "Quiz wiz (3 no.) Round I", day: "06.02.2026", time: "16:00 - 18:00", venue: "Samskruthi Seminar Hall, A Block Ground Floor" },
    { category: "Literature", event: "Dumb charades (2 no.)", day: "06.02.2026", time: "16:00 - 18:00", venue: "NTR Vignan Library - III Floor" },
    { category: "Literature", event: "Word Master Round I & II", day: "07.02.2026", time: "09:00 - 12:00", venue: "N Block - 201" },
    { category: "Literature", event: "Story telling", day: "07.02.2026", time: "09:00 - 12:00", venue: "NTR Vignan Library - III Floor" },
    { category: "Literature", event: "Quiz wiz (3 no.) Round II & III", day: "07.02.2026", time: "10:00 - 13:00", venue: "Samskruthi Seminar Hall, A Block Ground Floor" },
    { category: "Literature", event: "Word Master Round III & IV", day: "07.02.2026", time: "14:00 - 16:00", venue: "N Block - 201" },
    { category: "Literature", event: "Impromptu (JAM)", day: "07.02.2026", time: "14:00 - 16:00", venue: "NTR Vignan Library - III Floor" },
    { category: "Music", event: "Singing Idol Round I", day: "06.02.2026", time: "10:00 - 13:00", venue: "Sa Re Ga Ma Hall, N Block I Floor" },
    { category: "Music", event: "Group Singing", day: "06.02.2026", time: "13:30 - 15:30", venue: "Convocation Hall" },
    { category: "Music", event: "Singing Jodi", day: "06.02.2026", time: "16:00 - 18:00", venue: "Sa Re Ga Ma Hall, N Block I Floor" },
    { category: "Music", event: "Singing Idol Round II", day: "06.02.2026", time: "17:00 - 18:30", venue: "Sanghamitra Hall, N Block II Floor" },
    { category: "Music", event: "Singing Idol Round III", day: "06.02.2026", time: "18:30 - 20:00", venue: "Sanghamitra Hall, N Block II Floor" },
    { category: "Music", event: "Classical/Light Vocal Solo", day: "07.02.2026", time: "09:00 - 11:00", venue: "Sa Re Ga Ma Hall, N Block I Floor" },
    { category: "Music", event: "Classical / Western Instrumental Solo", day: "07.02.2026", time: "11:00 - 13:00", venue: "Sa Re Ga Ma Hall, N Block I Floor" },
    { category: "Music", event: "Anthyakshari Duo", day: "07.02.2026", time: "11:00 - 14:00", venue: "N Block - 210" },
    { category: "Music", event: "Singing Idol Round IV", day: "07.02.2026", time: "14:00 - 15:00", venue: "Convocation Hall" },
    { category: "Music", event: "Western Vocal Solo Prelims", day: "07.02.2026", time: "14:00 - 15:30", venue: "Sa Re Ga Ma Hall, N Block I Floor" },
    { category: "Music", event: "Western Vocal Solo Finals", day: "07.02.2026", time: "15:30 - 16:30", venue: "Sa Re Ga Ma Hall, N Block I Floor" },
    { category: "Music", event: "Cultural Soundscape Lab: From Folk to Future by Mr. Arun Sivag", day: "07.02.2026", time: "10:00 - 13:00", venue: "MHP", isWorkshop: true },
    { category: "Spot Light", event: "Mr. & Ms. Mahotsav Round I", day: "06.02.2026", time: "10:00 - 11:00", venue: "N Block - 202" },
    { category: "Spot Light", event: "Mahotsav Got Talent Elimination round", day: "06.02.2026", time: "14:00 - 16:00", venue: "Sangamam Seminar Hall, A Block V Floor" },
    { category: "Spot Light", event: "Mr. & Ms. Mahotsav Round II", day: "06.02.2026", time: "15:00 - 17:00", venue: "U Block Centre Stage" },
    { category: "Spot Light", event: "Mr. & Ms. Mahotsav Round III", day: "07.02.2026", time: "10:00 - 11:00", venue: "U Block Centre Stage" },
    { category: "Spot Light", event: "Mahotsav Got Talent Finals", day: "07.02.2026", time: "15:00 - 16:00", venue: "Convocation Hall" },
    { category: "Techno Sports & Races", event: "Bot Wrestling(4 no)", day: "06.02.2026", time: "10:00 - 13:00", venue: "N Block Ground floor Open Air" },
    { category: "Techno Sports & Races", event: "Robo Races(4 no)", day: "07.02.2026", time: "09:00 - 12:00", venue: "N Block Ground floor Open Air" },
    { category: "Techno Sports & Races", event: "Line Follower Challenge(4 no)", day: "07.02.2026", time: "14:00 - 16:00", venue: "N Block Ground floor Open Air" },
    { category: "Visual Arts & Craft", event: "Theme Painting", day: "06.02.2026", time: "10:00 - 13:00", venue: "N Block - 107" },
    { category: "Visual Arts & Craft", event: "Mehandi", day: "06.02.2026", time: "10:00 - 13:00", venue: "N Block - 106" },
    { category: "Visual Arts & Craft", event: "Clay modelling", day: "06.02.2026", time: "14:00 - 17:00", venue: "N Block - 106" },
    { category: "Visual Arts & Craft", event: "Face Painting", day: "06.02.2026", time: "14:00 - 17:00", venue: "N Block - 107" },
    { category: "Visual Arts & Craft", event: "Mandala", day: "06.02.2026", time: "17:00 - 19:00", venue: "N Block - 107" },
    { category: "Visual Arts & Craft", event: "Rangoli (2 no.)", day: "07.02.2026", time: "09:00 - 12:00", venue: "H Block Grounds" },
    { category: "Visual Arts & Craft", event: "Pencil Sketching", day: "07.02.2026", time: "09:00 - 12:00", venue: "N Block - 107" },
    { category: "Visual Arts & Craft", event: "Collage", day: "07.02.2026", time: "13:00 - 16:00", venue: "N Block - 107" },
    { category: "Visual Arts & Craft", event: "Bamboo Crafts", day: "07.02.2026", time: "13:30 - 15:30", venue: "MHP", isWorkshop: true }
];

export const getDaySchedules = (): DaySchedule[] => {
    const days = ['05.02.2026', '06.02.2026', '07.02.2026'];
    const dayNames = ['Day 1 - February 5', 'Day 2 - February 6', 'Day 3 - February 7'];

    return days.map((day, index) => ({
        date: day,
        dayName: dayNames[index],
        events: scheduleData.filter(event => event.day === day)
    }));
};

export const getCategories = (): string[] => {
    const categories = new Set(scheduleData.map(event => event.category));
    return Array.from(categories).sort();
};

export const getEventsByDayAndCategory = (day: string, category?: string): ScheduleEvent[] => {
    let filtered = scheduleData.filter(event => event.day === day);
    if (category && category !== 'All') {
        filtered = filtered.filter(event => event.category === category);
    }
    return filtered;
};
