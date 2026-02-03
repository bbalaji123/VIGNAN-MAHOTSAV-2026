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

// Schedule data including all events - Cultural, Sports, Gaming, etc.
export const scheduleData: ScheduleEvent[] = [
    { sno: 1, category: "Dance", event: "Dancing Star – Western Solo Prelims", day: "06.02.2026", time: "10:00 AM - 1:00 PM", venue: "U Block Centre stage" },
    { sno: 2, category: "Dance", event: "Classical Dance Solo", day: "06.02.2026", time: "10:00 AM - 1:00 PM", venue: "Sangamam Seminar Hall, A Block V Floor" },
    { sno: 3, category: "Dance", event: "Dancing Star – Western Solo Finals", day: "06.02.2026", time: "2:00 PM - 3:00 PM", venue: "U Block Centre stage" },
    { category: "Dance", event: "Group Dance (10 no.)", day: "07.02.2026", time: "9:00 AM - 1:00 PM", venue: "Convocation Hall" },
    { category: "Dance", event: "Dancing Jodi – Western Duo", day: "07.02.2026", time: "1:00 PM - 3:00 PM", venue: "U Block Centre stage" },
    { category: "Dance", event: "Spot Dance - Jodi", day: "07.02.2026", time: "4:00 PM - 5:30 PM", venue: "Convocation Hall" },
    { category: "Dance", event: "Contemporary Movement & Identity Lab by French Artist - Ms. Paulene", day: "06.02.2026", time: "2:30 PM - 5:30 PM", venue: "MHP", isWorkshop: true },
    { category: "Digital Storytelling & Creative Media", event: "Short film (Offline Entries - Prelims)", day: "05.02.2026", time: "9:00 AM - 4:00 PM", venue: "AGF - 04" },
    { category: "Digital Storytelling & Creative Media", event: "Short Film - Finals", day: "06.02.2026", time: "9:00 AM - 12:00 PM", venue: "Sanghamitra Hall, N Block II Floor" },
    { category: "Digital Storytelling & Creative Media", event: "Mahotsav Digital Chronicle Challenge - Participaint Reporting", day: "06.02.2026", time: "10:00 AM - 11:00 AM", venue: "NB 314" },
    { category: "Digital Storytelling & Creative Media", event: "Chit Chat with Champion movie Director Mr. Pradeep Advaitham", day: "06.02.2026", time: "12:00 PM - 1:00 PM", venue: "Sanghamitra Hall, N Block II Floor" },
    { category: "Digital Storytelling & Creative Media", event: "Digital Poster Competition - Online", day: "07.02.2026", time: "10:00 AM - 11:00 AM", venue: "NB 314" },
    { category: "Digital Storytelling & Creative Media", event: "Life in a Minute - Online - 4 no", day: "07.02.2026", time: "11:00 AM - 12:00 PM", venue: "NB 314" },
    { category: "Digital Storytelling & Creative Media", event: "Theme Photography - Online", day: "07.02.2026", time: "12:00 PM - 1:00 PM", venue: "NB 314" },
    { category: "Digital Storytelling & Creative Media", event: "Mahotsav Digital Chronicle Challenge", day: "07.02.2026", time: "1:00 PM - 4:00 PM", venue: "NB 314" },
    { category: "Dramatics", event: "Skit (8 no.)", day: "06.02.2026", time: "10:00 AM - 1:00 PM", venue: "Convocation Hall" },
    { category: "Dramatics", event: "Dialogue Dhamakha", day: "06.02.2026", time: "3:00 PM - 5:00 PM", venue: "Sanghamitra Hall, N Block II Floor" },
    { category: "Dramatics", event: "Mono Action", day: "07.02.2026", time: "9:00 AM - 11:00 AM", venue: "Sanghamitra Hall, N Block II Floor" },
    { category: "Dramatics", event: "On the Spot Ad making", day: "07.02.2026", time: "11:00 AM - 1:00 PM", venue: "Sanghamitra Hall, N Block II Floor" },
    { category: "Dramatics", event: "Mime (6 no.)", day: "07.02.2026", time: "2:00 PM - 4:00 PM", venue: "Sanghamitra Hall, N Block II Floor" },
    { category: "Fashion Design & Styling", event: "Texart (Fashion sketching)", day: "06.02.2026", time: "10:00 AM - 1:00 PM", venue: "N Block - 203" },
    { category: "Fashion Design & Styling", event: "Draping Stories: One Fabric, Infinite Forms by Mr. Sourav Das", day: "06.02.2026", time: "10:00 AM - 1:00 PM", venue: "MHP", isWorkshop: true },
    { category: "Fashion Design & Styling", event: "Haute Couture - Theme Ramp walk (12 no.)", day: "06.02.2026", time: "5:00 PM - 7:00 PM", venue: "Convocation Hall" },
    { category: "Fashion Design & Styling", event: "T-Shirt designing", day: "07.02.2026", time: "9:00 AM - 11:00 AM", venue: "H Block VGF 09" },
    { category: "Fashion Design & Styling", event: "Craft villa ( Accessory design)", day: "07.02.2026", time: "1:00 PM - 3:00 PM", venue: "N Block - 203" },
    { category: "Gaming", event: "eFootball (PC) (3 no)", day: "06.02.2026", time: "10:00 AM - 1:00 PM", venue: "NB 611,NB 612" },
    { category: "Gaming", event: "Smash Karts (PC) (solo)", day: "06.02.2026", time: "10:00 AM - 1:00 PM", venue: "NB 613,NB 615,NB 616,NB 617" },
    { category: "Gaming", event: "VALORANT (PC) (5 no)", day: "06.02.2026", time: "2:00 PM - 5:00 PM", venue: "NB 611,NB 612" },
    { category: "Gaming", event: "Counter Strike (PC) (5 no)", day: "07.02.2026", time: "10:00 AM - 2:00 PM", venue: "NB 613,NB 615" },
    { category: "Literature", event: "Master Orator Round I", day: "06.02.2026", time: "10:00 AM - 1:00 PM", venue: "NTR Vignan Library - III Floor" },
    { category: "Literature", event: "Telugu Vyaasa rachana", day: "06.02.2026", time: "10:00 AM - 1:00 PM", venue: "Samskruthi Seminar Hall, A Block Ground Floor" },
    { category: "Literature", event: "Shayari – Hindi", day: "06.02.2026", time: "12:00 PM - 2:00 PM", venue: "NTR Vignan Library - III Floor" },
    { category: "Literature", event: "Spot Creative writing", day: "06.02.2026", time: "2:00 PM - 4:00 PM", venue: "Samskruthi Seminar Hall, A Block Ground Floor" },
    { category: "Literature", event: "Master Orator Round II", day: "06.02.2026", time: "2:00 PM - 4:00 PM", venue: "NTR Vignan Library - III Floor" },
    { category: "Literature", event: "Quiz wiz (3 no.) Round I", day: "06.02.2026", time: "4:00 PM - 6:00 PM", venue: "Samskruthi Seminar Hall, A Block Ground Floor" },
    { category: "Literature", event: "Dumb charades (2 no.)", day: "06.02.2026", time: "4:00 PM - 6:00 PM", venue: "NTR Vignan Library - III Floor" },
    { category: "Literature", event: "Word Master Round I & II", day: "07.02.2026", time: "9:00 AM - 12:00 PM", venue: "N Block - 201" },
    { category: "Literature", event: "Story telling", day: "07.02.2026", time: "9:00 AM - 12:00 PM", venue: "NTR Vignan Library - III Floor" },
    { category: "Literature", event: "Quiz wiz (3 no.) Round II & III", day: "07.02.2026", time: "10:00 AM - 1:00 PM", venue: "Samskruthi Seminar Hall, A Block Ground Floor" },
    { category: "Literature", event: "Word Master Round III & IV", day: "07.02.2026", time: "2:00 PM - 4:00 PM", venue: "N Block - 201" },
    { category: "Literature", event: "Impromptu (JAM)", day: "07.02.2026", time: "2:00 PM - 4:00 PM", venue: "NTR Vignan Library - III Floor" },
    { category: "Music", event: "Singing Idol Round I", day: "06.02.2026", time: "10:00 AM - 1:00 PM", venue: "Sa Re Ga Ma Hall, N Block I Floor" },
    { category: "Music", event: "Group Singing", day: "06.02.2026", time: "1:30 PM - 3:30 PM", venue: "Convocation Hall" },
    { category: "Music", event: "Singing Jodi", day: "06.02.2026", time: "4:00 PM - 6:00 PM", venue: "Sa Re Ga Ma Hall, N Block I Floor" },
    { category: "Music", event: "Singing Idol Round II", day: "06.02.2026", time: "5:00 PM - 6:30 PM", venue: "Sanghamitra Hall, N Block II Floor" },
    { category: "Music", event: "Singing Idol Round III", day: "06.02.2026", time: "6:30 PM - 8:00 PM", venue: "Sanghamitra Hall, N Block II Floor" },
    { category: "Music", event: "Classical/Light Vocal Solo", day: "07.02.2026", time: "9:00 AM - 11:00 AM", venue: "Sa Re Ga Ma Hall, N Block I Floor" },
    { category: "Music", event: "Classical / Western Instrumental Solo", day: "07.02.2026", time: "11:00 AM - 1:00 PM", venue: "Sa Re Ga Ma Hall, N Block I Floor" },
    { category: "Music", event: "Anthyakshari Duo", day: "07.02.2026", time: "11:00 AM - 2:00 PM", venue: "N Block - 210" },
    { category: "Music", event: "Singing Idol Round IV", day: "07.02.2026", time: "2:00 PM - 3:00 PM", venue: "Convocation Hall" },
    { category: "Music", event: "Western Vocal Solo Prelims", day: "07.02.2026", time: "2:00 PM - 3:30 PM", venue: "Sa Re Ga Ma Hall, N Block I Floor" },
    { category: "Music", event: "Western Vocal Solo Finals", day: "07.02.2026", time: "3:30 PM - 4:30 PM", venue: "Sa Re Ga Ma Hall, N Block I Floor" },
    { category: "Music", event: "Cultural Soundscape Lab: From Folk to Future by Mr. Arun Sivag", day: "07.02.2026", time: "10:00 AM - 1:00 PM", venue: "MHP", isWorkshop: true },
    { category: "Spot Light", event: "Mr. & Ms. Mahotsav Round I", day: "06.02.2026", time: "10:00 AM - 11:00 AM", venue: "N Block - 202" },
    { category: "Spot Light", event: "Mahotsav Got Talent Elimination round", day: "06.02.2026", time: "2:00 PM - 4:00 PM", venue: "Sangamam Seminar Hall, A Block V Floor" },
    { category: "Spot Light", event: "Mr. & Ms. Mahotsav Round II", day: "06.02.2026", time: "3:00 PM - 5:00 PM", venue: "U Block Centre Stage" },
    { category: "Spot Light", event: "Mr. & Ms. Mahotsav Round III", day: "07.02.2026", time: "10:00 AM - 11:00 AM", venue: "U Block Centre Stage" },
    { category: "Spot Light", event: "Mahotsav Got Talent Finals", day: "07.02.2026", time: "3:00 PM - 4:00 PM", venue: "Convocation Hall" },
    { category: "Techno Sports & Races", event: "Robo Races(4 no)", day: "06.02.2026", time: "10:00 AM - 1:00 PM", venue: "N Block Ground floor Open Air" },
    { category: "Techno Sports & Races", event: "Bot Wrestling(4 no)", day: "07.02.2026", time: "9:00 AM - 12:00 PM", venue: "N Block Ground floor Open Air" },
    { category: "Techno Sports & Races", event: "Line Follower Challenge(4 no)", day: "07.02.2026", time: "2:00 PM - 4:00 PM", venue: "N Block Ground floor Open Air" },
    { category: "Visual Arts & Craft", event: "Theme Painting", day: "06.02.2026", time: "10:00 AM - 1:00 PM", venue: "N Block - 107" },
    { category: "Visual Arts & Craft", event: "Mehandi", day: "06.02.2026", time: "10:00 AM - 1:00 PM", venue: "N Block - 106" },
    { category: "Visual Arts & Craft", event: "Clay modelling", day: "06.02.2026", time: "2:00 PM - 5:00 PM", venue: "N Block - 106" },
    { category: "Visual Arts & Craft", event: "Face Painting", day: "06.02.2026", time: "2:00 PM - 5:00 PM", venue: "N Block - 107" },
    { category: "Visual Arts & Craft", event: "Mandala", day: "06.02.2026", time: "5:00 PM - 7:00 PM", venue: "N Block - 107" },
    { category: "Visual Arts & Craft", event: "Rangoli (2 no.)", day: "07.02.2026", time: "9:00 AM - 12:00 PM", venue: "H Block Grounds" },
    { category: "Visual Arts & Craft", event: "Pencil Sketching", day: "07.02.2026", time: "9:00 AM - 12:00 PM", venue: "N Block - 107" },
    { category: "Visual Arts & Craft", event: "Collage", day: "07.02.2026", time: "1:00 PM - 4:00 PM", venue: "N Block - 107" },
    { category: "Visual Arts & Craft", event: "Bamboo Crafts", day: "07.02.2026", time: "1:30 PM - 3:30 PM", venue: "MHP", isWorkshop: true },
    // Sports Events - Individual Categories
    { category: "Basketball", event: "1st Round Matches", day: "05.02.2026", time: "06:00 PM - 10:00 PM", venue: "Opposite Convocation hall (Basketball Court)" },
    { category: "Football", event: "1st Round Matches", day: "05.02.2026", time: "06:00 PM - 10:00 PM", venue: "Cricket Ground" },
    { category: "Kabaddi", event: "1st Round Matches", day: "05.02.2026", time: "06:00 PM - 10:00 PM", venue: "Out Door Gym Beside" },
    { category: "Kho-Kho", event: "1st Round Matches", day: "05.02.2026", time: "06:00 PM - 10:00 PM", venue: "Out Door Gym Beside" },
    { category: "Volleyball", event: "1st Round Matches", day: "05.02.2026", time: "06:00 PM - 10:00 PM", venue: "Beside Convocation Hall" },
    { category: "Hockey", event: "1st Round Matches", day: "06.02.2026", time: "08:00 AM - 12:00 PM", venue: "H-Block Ground" },
    { category: "Table Tennis", event: "1st Round Matches", day: "06.02.2026", time: "08:00 AM - 12:00 PM", venue: "H-Block Table Tennis Room (Beside Canteen)" },
    { category: "Taekwondo", event: "1st Round Matches", day: "06.02.2026", time: "08:00 AM - 12:00 PM", venue: "N-Block Ground Floor (Synthetic Kabaddi Court)" },
    { category: "Yoga", event: "1st Round Matches", day: "06.02.2026", time: "08:00 AM - 12:00 PM", venue: "H-Block, 3rd Floor, Sravanthi Seminar Hall" },
    { category: "Chess", event: "1st Round Matches", day: "06.02.2026", time: "08:00 AM - 12:00 PM", venue: "N-Block 3rd floor 307, 4th floor 407" },
    { category: "Athletics", event: "100M (Heats)", day: "06.02.2026", time: "08:00 AM - 12:00 PM", venue: "U-Block Opposite Running Track" },
    { category: "Athletics", event: "800M (Heat/Final)", day: "06.02.2026", time: "08:00 AM - 12:00 PM", venue: "U-Block Opposite Running Track" },
    { category: "Athletics", event: "4X100M Relay (Heats)", day: "06.02.2026", time: "08:00 AM - 12:00 PM", venue: "U-Block Opposite Running Track" },
    { category: "Athletics", event: "4X400M Relay (Heats)", day: "06.02.2026", time: "08:00 AM - 12:00 PM", venue: "U-Block Opposite Running Track" },
    { category: "Para Athletics", event: "Finals - 100M (Hand Amputee)", day: "06.02.2026", time: "12:00 PM - 01:00 PM", venue: "U-Block Opposite Running Track" },
    { category: "Para Athletics", event: "Finals - 100M (Leg Amputee)", day: "06.02.2026", time: "12:00 PM - 01:00 PM", venue: "U-Block Opposite Running Track" },
    { category: "Para Athletics", event: "Finals - 100M (Visual Impairment)", day: "06.02.2026", time: "12:00 PM - 01:00 PM", venue: "U-Block Opposite Running Track" },
    { category: "Para Athletics", event: "Finals - 400M (Hand Amputee)", day: "06.02.2026", time: "12:00 PM - 01:00 PM", venue: "U-Block Opposite Running Track" },
    { category: "Para Athletics", event: "Finals - 400M (Leg Amputee)", day: "06.02.2026", time: "12:00 PM - 01:00 PM", venue: "U-Block Opposite Running Track" },
    { category: "Para Athletics", event: "Finals - 400M (Visual Impairment)", day: "06.02.2026", time: "12:00 PM - 01:00 PM", venue: "U-Block Opposite Running Track" },
    { category: "Basketball", event: "Quarter Final", day: "06.02.2026", time: "02:00 PM - 06:00 PM", venue: "Opposite Convocation hall (Basketball Court)" },
    { category: "Football", event: "Quarter Final", day: "06.02.2026", time: "02:00 PM - 06:00 PM", venue: "Cricket Ground" },
    { category: "Kabaddi", event: "Quarter Final", day: "06.02.2026", time: "02:00 PM - 06:00 PM", venue: "Out Door Gym Beside" },
    { category: "Kho-Kho", event: "Quarter Final", day: "06.02.2026", time: "02:00 PM - 06:00 PM", venue: "Out Door Gym Beside" },
    { category: "Volleyball", event: "Quarter Final", day: "06.02.2026", time: "02:00 PM - 06:00 PM", venue: "Beside Convocation Hall" },
    { category: "Hockey", event: "Quarter Final", day: "06.02.2026", time: "02:00 PM - 06:00 PM", venue: "H-Block Ground" },
    { category: "Athletics", event: "3 KM Run Finals (Men)", day: "07.02.2026", time: "06:00 AM - 08:00 AM", venue: "Campus Track" },
    { category: "Basketball", event: "Semi Final", day: "07.02.2026", time: "08:00 AM - 11:00 AM", venue: "Opposite Convocation hall (Basketball Court)" },
    { category: "Football", event: "Semi Final", day: "07.02.2026", time: "08:00 AM - 11:00 AM", venue: "Cricket Ground" },
    { category: "Volleyball", event: "Semi Final", day: "07.02.2026", time: "08:00 AM - 11:00 AM", venue: "Beside Convocation Hall" },
    { category: "Hockey", event: "Semi Final", day: "07.02.2026", time: "08:00 AM - 11:00 AM", venue: "H-Block Ground" },
    { category: "Kabaddi", event: "Semi Final", day: "07.02.2026", time: "08:00 AM - 11:00 AM", venue: "Out Door Gym Beside" },
    { category: "Kho-Kho", event: "Semi Final", day: "07.02.2026", time: "08:00 AM - 11:00 AM", venue: "Out Door Gym Beside" },
    { category: "Table Tennis", event: "Semi Final", day: "07.02.2026", time: "08:00 AM - 11:00 AM", venue: "H-Block Table Tennis Room (Beside Canteen)" },
    { category: "Chess", event: "Semi Final", day: "07.02.2026", time: "08:00 AM - 11:00 AM", venue: "N-Block 3rd floor 307, 4th floor 407" },
    { category: "Taekwondo", event: "Semi Final", day: "07.02.2026", time: "08:00 AM - 11:00 AM", venue: "N-Block Ground Floor (Synthetic Kabaddi Court)" },
    { category: "Yoga", event: "Semi Final", day: "07.02.2026", time: "08:00 AM - 11:00 AM", venue: "H-Block, 3rd Floor, Sravanthi Seminar Hall" },
    { category: "Tennikoit", event: "Semi Final", day: "07.02.2026", time: "08:00 AM - 11:00 AM", venue: "H-Block Ground" },
    { category: "Basketball", event: "Finals", day: "07.02.2026", time: "02:30 PM - 03:30 PM", venue: "Opposite Convocation hall (Basketball Court)" },
    { category: "Football", event: "Finals", day: "07.02.2026", time: "02:30 PM - 03:30 PM", venue: "Cricket Ground" },
    { category: "Volleyball", event: "Finals", day: "07.02.2026", time: "02:30 PM - 03:30 PM", venue: "Beside Convocation Hall" },
    { category: "Hockey", event: "Finals", day: "07.02.2026", time: "02:30 PM - 03:30 PM", venue: "H-Block Ground" },
    { category: "Kabaddi", event: "Finals", day: "07.02.2026", time: "02:30 PM - 03:30 PM", venue: "Out Door Gym Beside" },
    { category: "Kho-Kho", event: "Finals", day: "07.02.2026", time: "02:30 PM - 03:30 PM", venue: "Out Door Gym Beside" },
    { category: "Table Tennis", event: "Finals", day: "07.02.2026", time: "02:30 PM - 03:30 PM", venue: "H-Block Table Tennis Room (Beside Canteen)" },
    { category: "Chess", event: "Finals", day: "07.02.2026", time: "02:30 PM - 03:30 PM", venue: "N-Block 3rd floor 307, 4th floor 407" },
    { category: "Taekwondo", event: "Finals", day: "07.02.2026", time: "02:30 PM - 03:30 PM", venue: "N-Block Ground Floor (Synthetic Kabaddi Court)" },
    { category: "Yoga", event: "Finals", day: "07.02.2026", time: "02:30 PM - 03:30 PM", venue: "H-Block, 3rd Floor, Sravanthi Seminar Hall" },
    { category: "Tennikoit", event: "Finals", day: "07.02.2026", time: "02:30 PM - 03:30 PM", venue: "H-Block Ground" },
    { category: "Throwball", event: "Finals", day: "07.02.2026", time: "02:30 PM - 03:30 PM", venue: "H-Block Ground" },
    { category: "Athletics", event: "Finals - 100M", day: "07.02.2026", time: "02:30 PM - 03:30 PM", venue: "U-Block Opposite Running Track" },
    { category: "Athletics", event: "Finals - 4X100M Relay", day: "07.02.2026", time: "02:30 PM - 03:30 PM", venue: "U-Block Opposite Running Track" },
    { category: "Athletics", event: "Finals - 4X400M Relay", day: "07.02.2026", time: "02:30 PM - 03:30 PM", venue: "U-Block Opposite Running Track" }
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
