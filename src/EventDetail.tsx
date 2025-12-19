import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface EventDetailData {
  title: string;
  subtitle: string;
  rules: string[];
  prizes: {
    first: string;
    second: string;
    third?: string;
    fourth?: string;
  };
  contacts: {
    name: string;
    phone: string;
  }[];
}

const EventDetail: React.FC = () => {
  const { eventName } = useParams<{ eventName: string }>();
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);

  // Event data
  const eventDetailsData: { [key: string]: EventDetailData } = {
    "Chess": {
      title: "INDIVIDUAL EVENTS",
      subtitle: "CHESS (Men & Women)",
      rules: [
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "Everyone participant must submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "Chess Tournament is conducted in Swiss League system.",
        "Everyone should report at least 30 mins before scheduled match time.",
        "All India Chess Federation Rules & Regulations are adopted for the competition.",
        "Umpire decision will be final while during the match. Protest can be raised within 15 minutes of the completion of the match.",
        "Tie breaks is as following: A. Buchholz B. Buchholz but 1 C. Sonneburn burger D. Direct encounter E. Great number of victories",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
      ],
      prizes: {
        first: "Rs. 6,000",
        second: "Rs. 4,000"
      },
      contacts: [
        { name: "Ms. K. Deepika Siva Gowri", phone: "+91 9390335366" },
        { name: "Ms. M. Poojitha", phone: "+91 8374697597" }
      ]
    },
    "Table Tennis": {
      title: "INDIVIDUAL EVENTS",
      subtitle: "TABLE TENNIS - Singles (Men & Women)",
      rules: [
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "Everyone participant must submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "Everyone should report at least 30 mins before scheduled match time.",
        "Matches are conducted on knock out basis and are played to 11 points.",
        "All player must come with a proper sports attire.",
        "Umpire decision will be final while during the match. Protest can be raised within 15 minutes of the completion of the match.",
        "There will be only three sets for each match.",
        "Five sets will be conducted for semifinals and finals.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
      ],
      prizes: {
        first: "Rs. 3,000",
        second: "Rs. 2,000"
      },
      contacts: [
        { name: "Mr. U. Om Shri", phone: "+91 9347775310" },
        { name: "Ms. K. Deepika Siva Gowri", phone: "+91 9390335366" }
      ]
    },
    "Tennikoit": {
      title: "INDIVIDUAL EVENTS",
      subtitle: "TENNICOIT – Singles (Women)",
      rules: [
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "Everyone participant must submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "All participants must come with a proper sports attire.",
        "Participants should report at least 30 mins before scheduled time.",
        "The match is played as the best of 3 sets, 21+21+15 points.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500"
      },
      contacts: [
        { name: "Ms. Y. Lavanya", phone: "+91 9063809790" },
        { name: "Ms. K. Vaishnavi", phone: "+91 7729838501" }
      ]
    },
    "Traditional Yogasana": {
      title: "INDIVIDUAL EVENTS",
      subtitle: "YOGASANA (Men & Women) - Traditional & Artistic",
      rules: [
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "Everyone participant must submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "Everyone should report at least 30 mins before scheduled match time.",
        "All participants must come with a proper sports attire.",
        "Umpire decision will be final while during the match. Protest can be raised within 15 minutes of the completion of the match.",
        "Syllabus, Rules & Regulations for the Yogasana events: Traditional Yogasana (singles) Event - Syllabus of Seniors A for Men & Women as per new code of points of Yogasana Bharat",
        "Artistic Yogasana (singles) Event - Artistic Yogasana Single Event syllabus as per new code of points of Yogasana Bharat",
        "Link to refer syllabus: https://www.yogasanabharat.com/code",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
      ],
      prizes: {
        first: "Rs. 2,000 (Traditional) / Rs. 2,000 (Artistic)",
        second: "Rs. 1,500 (Traditional) / Rs. 1,500 (Artistic)"
      },
      contacts: [
        { name: "Mr. G. Siva Rama Krishna", phone: "+91 6309959419" },
        { name: "Ms. P. Syam Keerthi", phone: "+91 8886161616" }
      ]
    },
    "Artistic Yogasana": {
      title: "INDIVIDUAL EVENTS",
      subtitle: "YOGASANA (Men & Women) - Traditional & Artistic",
      rules: [
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "Everyone participant must submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "Everyone should report at least 30 mins before scheduled match time.",
        "All participants must come with a proper sports attire.",
        "Umpire decision will be final while during the match. Protest can be raised within 15 minutes of the completion of the match.",
        "Syllabus, Rules & Regulations for the Yogasana events: Traditional Yogasana (singles) Event - Syllabus of Seniors A for Men & Women as per new code of points of Yogasana Bharat",
        "Artistic Yogasana (singles) Event - Artistic Yogasana Single Event syllabus as per new code of points of Yogasana Bharat",
        "Link to refer syllabus: https://www.yogasanabharat.com/code",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
      ],
      prizes: {
        first: "Rs. 2,000 (Traditional) / Rs. 2,000 (Artistic)",
        second: "Rs. 1,500 (Traditional) / Rs. 1,500 (Artistic)"
      },
      contacts: [
        { name: "Mr. G. Siva Rama Krishna", phone: "+91 6309959419" },
        { name: "Ms. P. Syam Keerthi", phone: "+91 8886161616" }
      ]
    },
    "Taekwondo": {
      title: "INDIVIDUAL EVENTS",
      subtitle: "TAEKWONDO (Men & Women)",
      rules: [
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "Everyone participant must submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "Everyone should report at least 30 mins before scheduled match time.",
        "Men Weight Categories (U-54, U-58, U-63, U-68, U-74, U-80, U-87, above 87).",
        "Women Weight Categories (U-46, U-49, U-53, U-57, U-62, U-67, U-73, above 73).",
        "World Taekwondo (WT) new competition rules are applicable.",
        "Senior men and women kyorugi competitions only.",
        "All participants must come with a proper sports attire.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
      ],
      prizes: {
        first: "Rs. 1,500",
        second: "Rs. 1,000"
      },
      contacts: [
        { name: "Mr. U. Om Shri", phone: "+91 9347775310" },
        { name: "Ms. Ch. Jyothika", phone: "+91 6301174427" }
      ]
    },
    "Volley ball (Men)": {
      title: "TEAM EVENTS",
      subtitle: "VOLLEY BALL (Men)",
      rules: [
        "Team strength is 6+4 players.",
        "Match will be organized for a total of 3 sets and each set contains 25+25+15 points. It may vary depending upon the situation after prior information to both participating teams.",
        "All matches are conducted on knock out basis.",
        "Every team should report at least 30 mins before scheduled match time.",
        "Every team should come with a proper sports attire.",
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "All teams must register the required number of players, including substitutes and submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "Umpire decision will be final while during the match. Protest can be raised within 15 minutes of the completion of the match.",
        "Any kind of physical misbehavior of any player will lead to disqualification of the whole team.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
      ],
      prizes: {
        first: "Rs. 30,000",
        second: "Rs. 20,000",
        third: "Rs. 7,000",
        fourth: "Rs. 3,000"
      },
      contacts: [
        { name: "Mr. V Rajesh", phone: "+91 98661 46676" },
        { name: "Ms. Ch. Manvitha", phone: "+91 94928 31319" },
        { name: "Mr. P. Murali", phone: "+91 7207049397" }
      ]
    },
    "Volley ball (Women)": {
      title: "TEAM EVENTS",
      subtitle: "VOLLEY BALL (Women)",
      rules: [
        "Team strength is 6+4 players.",
        "Match will be organized for a total of 3 sets and each set contains 25+25+15 points. It may vary depending upon the situation after prior information to both participating teams.",
        "All matches are conducted on knock out basis.",
        "Every team should report at least 30 mins before scheduled match time.",
        "Every team should come with a proper sports attire.",
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "All teams must register the required number of players, including substitutes and submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "Umpire decision will be final while during the match. Protest can be raised within 15 minutes of the completion of the match.",
        "Any kind of physical misbehavior of any player will lead to disqualification of the whole team.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
      ],
      prizes: {
        first: "Rs. 15,000",
        second: "Rs. 10,000"
      },
      contacts: [
        { name: "Mr. V Rajesh", phone: "+91 98661 46676" },
        { name: "Ms. Ch. Manvitha", phone: "+91 94928 31319" },
        { name: "Mr. P. Murali", phone: "+91 7207049397" }
      ]
    },
    "Basket ball (Men)": {
      title: "TEAM EVENTS",
      subtitle: "BASKET BALL (Men)",
      rules: [
        "Team strength is 5+5 players.",
        "All matches are conducted on knock out basis.",
        "Every team should report at least 30 mins before scheduled match time.",
        "Every team should come with a proper sports attire.",
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "All teams must register the required number of players, including substitutes and submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "Umpire decision will be final while during the match. Protest can be raised within 15 minutes of the completion of the match.",
        "Any kind of physical misbehavior of any player will lead to disqualification of the whole team.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
      ],
      prizes: {
        first: "Rs. 30,000",
        second: "Rs. 20,000",
        third: "Rs. 7,000",
        fourth: "Rs. 3,000"
      },
      contacts: [
        { name: "Ms. Ch. Jyothika", phone: "+91 6301174427" },
        { name: "Mr. M. Manikanta", phone: "+91 7672069471" },
        { name: "Ms. Ch. Manvitha", phone: "+91 94928 31319" }
      ]
    },
    "Basket ball (Women)": {
      title: "TEAM EVENTS",
      subtitle: "BASKET BALL (Women)",
      rules: [
        "Team strength is 5+5 players.",
        "All matches are conducted on knock out basis.",
        "Every team should report at least 30 mins before scheduled match time.",
        "Every team should come with a proper sports attire.",
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "All teams must register the required number of players, including substitutes and submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "Umpire decision will be final while during the match. Protest can be raised within 15 minutes of the completion of the match.",
        "Any kind of physical misbehavior of any player will lead to disqualification of the whole team.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
      ],
      prizes: {
        first: "Rs. 15,000",
        second: "Rs. 10,000"
      },
      contacts: [
        { name: "Ms. Ch. Jyothika", phone: "+91 6301174427" },
        { name: "Mr. M. Manikanta", phone: "+91 7672069471" },
        { name: "Ms. Ch. Manvitha", phone: "+91 94928 31319" }
      ]
    },
    "Kabaddi (Men)": {
      title: "TEAM EVENTS",
      subtitle: "KABADDI (Men)",
      rules: [
        "Team strength is 7+3 players.",
        "Pro Kabaddi rules & Regulations are applicable.",
        "All matches will be conducted on the kabaddi mat.",
        "Player may wear mat shoes or can play with barefoot.",
        "All matches are conducted on knock out basis.",
        "Every team should report at least 30 mins before scheduled match time.",
        "Every team should come with a proper sports attire.",
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "All teams must register the required number of players, including substitutes and submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "Umpire decision will be final while during the match. Protest can be raised within 15 minutes of the completion of the match.",
        "Any kind of physical misbehavior of any player will lead to disqualification of the whole team.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
      ],
      prizes: {
        first: "Rs. 30,000",
        second: "Rs. 20,000",
        third: "Rs. 7,000",
        fourth: "Rs. 3,000"
      },
      contacts: [
        { name: "Mr. N. Gopi Chandu", phone: "+91 9014360039" },
        { name: "Ms. E. Nikhitha", phone: "+91 6281464539" },
        { name: "Ms. Ch. Bhavana", phone: "+91 9346557223" }
      ]
    },
    "Kabaddi (Women)": {
      title: "TEAM EVENTS",
      subtitle: "KABADDI (Women)",
      rules: [
        "Team strength is 7+3 players.",
        "Pro Kabaddi rules & Regulations are applicable.",
        "All matches will be conducted on the kabaddi mat.",
        "Player may wear mat shoes or can play with barefoot.",
        "All matches are conducted on knock out basis.",
        "Every team should report at least 30 mins before scheduled match time.",
        "Every team should come with a proper sports attire.",
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "All teams must register the required number of players, including substitutes and submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "Umpire decision will be final while during the match. Protest can be raised within 15 minutes of the completion of the match.",
        "Any kind of physical misbehavior of any player will lead to disqualification of the whole team.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
      ],
      prizes: {
        first: "Rs. 15,000",
        second: "Rs. 10,000"
      },
      contacts: [
        { name: "Mr. N. Gopi Chandu", phone: "+91 9014360039" },
        { name: "Ms. E. Nikhitha", phone: "+91 6281464539" },
        { name: "Ms. Ch. Bhavana", phone: "+91 9346557223" }
      ]
    },
    "Kho-Kho (Men)": {
      title: "TEAM EVENTS",
      subtitle: "KHO-KHO (Men)",
      rules: [
        "Team strength is 9+3 players.",
        "All matches are conducted on knock out basis.",
        "Every team should report at least 30 mins before scheduled match time.",
        "Every team should come with a proper sports attire.",
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "All teams must register the required number of players, including substitutes and submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "Umpire decision will be final while during the match. Protest can be raised within 15 minutes of the completion of the match.",
        "Any kind of physical misbehavior of any player will lead to disqualification of the whole team.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
      ],
      prizes: {
        first: "Rs. 30,000",
        second: "Rs. 20,000",
        third: "Rs. 7,000",
        fourth: "Rs. 3,000"
      },
      contacts: [
        { name: "Mr. S. Badari Ajith", phone: "+91 9346193840" },
        { name: "Mr. N. Gopi Chandu", phone: "+91 9014360039" },
        { name: "Ms. E. Nikhitha", phone: "+91 6281464539" }
      ]
    },
    "Kho-Kho (Women)": {
      title: "TEAM EVENTS",
      subtitle: "KHO-KHO (Women)",
      rules: [
        "Team strength is 9+3 players.",
        "All matches are conducted on knock out basis.",
        "Every team should report at least 30 mins before scheduled match time.",
        "Every team should come with a proper sports attire.",
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "All teams must register the required number of players, including substitutes and submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "Umpire decision will be final while during the match. Protest can be raised within 15 minutes of the completion of the match.",
        "Any kind of physical misbehavior of any player will lead to disqualification of the whole team.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
      ],
      prizes: {
        first: "Rs. 15,000",
        second: "Rs. 10,000"
      },
      contacts: [
        { name: "Mr. S. Badari Ajith", phone: "+91 9346193840" },
        { name: "Mr. N. Gopi Chandu", phone: "+91 9014360039" },
        { name: "Ms. E. Nikhitha", phone: "+91 6281464539" }
      ]
    },
    "Hockey (Men)": {
      title: "TEAM EVENTS",
      subtitle: "HOCKEY (Men)",
      rules: [
        "Team strength is 7+3 players.",
        "All matches are conducted on knock out basis.",
        "Every team should report at least 30 mins before scheduled match time.",
        "Every team should come with a proper sports attire.",
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "All teams must register the required number of players, including substitutes and submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "Umpire decision will be final while during the match. Protest can be raised within 15 minutes of the completion of the match.",
        "Any kind of physical misbehavior of any player will lead to disqualification of the whole team.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
      ],
      prizes: {
        first: "Rs. 30,000",
        second: "Rs. 20,000",
        third: "Rs. 7,000",
        fourth: "Rs. 3,000"
      },
      contacts: [
        { name: "Mr. B. Bala", phone: "+91 7981216560" },
        { name: "Mr. G. Siva Rama Krishna", phone: "+91 6309959419" },
        { name: "Ms. M. Poojitha", phone: "+91 8374697597" }
      ]
    },
    "Hockey (Women)": {
      title: "TEAM EVENTS",
      subtitle: "HOCKEY (Women)",
      rules: [
        "Team strength is 7+3 players.",
        "All matches are conducted on knock out basis.",
        "Every team should report at least 30 mins before scheduled match time.",
        "Every team should come with a proper sports attire.",
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "All teams must register the required number of players, including substitutes and submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "Umpire decision will be final while during the match. Protest can be raised within 15 minutes of the completion of the match.",
        "Any kind of physical misbehavior of any player will lead to disqualification of the whole team.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
      ],
      prizes: {
        first: "Rs. 15,000",
        second: "Rs. 10,000"
      },
      contacts: [
        { name: "Mr. B. Bala", phone: "+91 7981216560" },
        { name: "Mr. G. Siva Rama Krishna", phone: "+91 6309959419" },
        { name: "Ms. M. Poojitha", phone: "+91 8374697597" }
      ]
    },
    "Throw ball": {
      title: "TEAM EVENTS",
      subtitle: "THROWBALL (Women)",
      rules: [
        "Team limit is 9+1 players.",
        "The match is played as the best of 3 sets, 25+25+15 points.",
        "All matches are conducted on knock out basis.",
        "Every team should report at least 30 mins before scheduled match time.",
        "Every team should come with a proper sports attire.",
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "All teams must register the required number of players, including substitutes and submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "Umpire decision will be final while during the match. Protest can be raised within 15 minutes of the completion of the match.",
        "Any kind of physical misbehavior of any player will lead to disqualification of the whole team.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
      ],
      prizes: {
        first: "Rs. 15,000",
        second: "Rs. 10,000"
      },
      contacts: [
        { name: "Ms. P. Syam Keerthi", phone: "+91 8886161616" },
        { name: "Ms. K. Vaishnavi", phone: "+91 7729838501" },
        { name: "Ms. Ch. Bhavana", phone: "+91 9346557223" }
      ]
    },
    "Football (Men)": {
      title: "TEAM EVENTS",
      subtitle: "FOOTBALL (Men)",
      rules: [
        "Team strength is 7+3 players.",
        "The time of each half will be informed before the commencement of tournament.",
        "All matches are conducted on knock out basis.",
        "Every team should report at least 30 mins before scheduled match time.",
        "Every team should come with a proper sports attire.",
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "All teams must register the required number of players, including substitutes and submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "Umpire decision will be final while during the match. Protest can be raised within 15 minutes of the completion of the match.",
        "Any kind of physical misbehavior of any player will lead to disqualification of the whole team.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
      ],
      prizes: {
        first: "Rs. 30,000",
        second: "Rs. 20,000",
        third: "Rs. 7,000",
        fourth: "Rs. 3,000"
      },
      contacts: [
        { name: "Mr. B. Bala", phone: "+91 7981216560" },
        { name: "Mr. P. Murali", phone: "+91 7207049397" },
        { name: "Ms. M. Poojitha", phone: "+91 8374697597" }
      ]
    },
    "Football (Women)": {
      title: "TEAM EVENTS",
      subtitle: "FOOTBALL (Women)",
      rules: [
        "Team strength is 7+3 players.",
        "The time of each half will be informed before the commencement of tournament.",
        "All matches are conducted on knock out basis.",
        "Every team should report at least 30 mins before scheduled match time.",
        "Every team should come with a proper sports attire.",
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "All teams must register the required number of players, including substitutes and submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "Umpire decision will be final while during the match. Protest can be raised within 15 minutes of the completion of the match.",
        "Any kind of physical misbehavior of any player will lead to disqualification of the whole team.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
      ],
      prizes: {
        first: "Rs. 15,000",
        second: "Rs. 10,000"
      },
      contacts: [
        { name: "Mr. B. Bala", phone: "+91 7981216560" },
        { name: "Mr. P. Murali", phone: "+91 7207049397" },
        { name: "Ms. M. Poojitha", phone: "+91 8374697597" }
      ]
    },
    "Classical Dance Solo": {
      title: "DANCE",
      subtitle: "Classical Dance Solo",
      rules: [
        "The classical dance performed can be from any of the approved schools of dance, such as Kathak, Kathakali, Bharat Natyam, Manipuri, Kuchipudi, Mohiniyattam, or Odissi.",
        "Participants will be allowed up to 10 minutes, which includes preparation time. Maximum three accompanists are permissible. Audio tracks are also permitted.",
        "The selected song(s) must not appear in movies or shows. However, if an original song is present in a movie, the original composition should be used.",
        "Judgment will be based on the qualities like Tal, Technique, Rhythm, Abhinaya or Expression, Costumes, Footwork and general impression."
      ],
      prizes: {
        first: "Rs. 4,000",
        second: "Rs. 3,000",
        third: "Rs. 2,000"
      },
      contacts: []
    },
    "Singing Idol": {
      title: "MUSIC",
      subtitle: "Singing Idol",
      rules: [
        "This competition consists a total of 4 rounds, with eliminations occurring after the first and third rounds.",
        "Any songs that may lead to controversies are not allowed.",
        "Karaoke is not allowed in the first round.",
        "Karaoke must be used mandatorily for 2nd, 3rd and 4th rounds.",
        "Medleys will not be entertained and the Karaoke tracks are to be submitted to the coordinators before the commencement of event.",
        "Judgement will be based on Pitch, Scale, and Rhythm, voice modulation, selection of song and stage presence.",
        "1st round: 2 minutes (one pallavi and one charanam without karaoke)",
        "2nd round: 3 minutes (Fast beat song with karaoke)",
        "3rd round: 3 minutes (Melody with karaoke)",
        "4th round: 5 minutes (any composition of Ilayaraja / A R Rahman / K V Mahadevan/ MM Keeravani / Mani Sharma. Karaoke is must)",
        "Promotion to the final round: Average scores from the 2nd and 3rd rounds will be utilized for promotion to the final round.",
        "Declaration of the IDOL: The final score will be calculated as a composite of 40% of the average scores from the 2nd and 3rd rounds, and 60% of the score from the 4th round performance."
      ],
      prizes: {
        first: "Rs. 4,000",
        second: "Rs. 3,000",
        third: "Rs. 2,000"
      },
      contacts: []
    },
    "Dancing Star - Western Solo": {
      title: "DANCE",
      subtitle: "Dancing Star - Western Dance Solo",
      rules: [
        "There will be an elimination round. Max time in this round will be 2 minutes.",
        "The final round can be performed as an extension of the preliminaries or as a new composition. The maximum duration for the final performance shall not exceed 4 minutes.",
        "The use of fire (including diyas, candles, or lighters) and water is not allowed.",
        "Film song of any language can be chosen for performance, any songs that may lead to controversies are not allowed.",
        "Any audio or track that are offensive, criticising or hurt others feelings must be avoided. This includes for ex. AI generated spoofs.",
        "Judgement will be based on choreography, selection of songs, expression and overall performance."
      ],
      prizes: {
        first: "Rs. 4,000",
        second: "Rs. 3,000",
        third: "Rs. 2,000"
      },
      contacts: []
    },
    "Group Singing": {
      title: "MUSIC",
      subtitle: "Group Singing",
      rules: [
        "A performing group must consist of a minimum of 4 singers and a maximum of 6 singers.",
        "The performance may be accompanied by either a live band (maximum of 3 accompanists) or a karaoke track.",
        "A participant (singer) is limited to performing with only one team. However, accompanists are permitted to perform with multiple teams.",
        "Folk song / Film song of any language can be chosen for performance, any songs of that may be lead to controversies are not allowed.",
        "Maximum time allowed for the group song is 5 minutes which does not include setting time. The setting time for a group shall not exceed 3 minutes.",
        "Judgement will be strictly on the basis of quality of singing only. Things like make-up, costumes and actions of the team are not considered for judgement."
      ],
      prizes: {
        first: "Rs. 5,000",
        second: "Rs. 3,500",
        third: "Rs. 2,000"
      },
      contacts: []
    },
    "Skit": {
      title: "THEATRE & CINEMATOGRAPHY",
      subtitle: "Skit",
      rules: [
        "A minimum of 4 and a maximum of 8 participants are allowed to participate in one item.",
        "The maximum time allotted for each team is 8 minutes.",
        "The use of make-up, drapery and background music is allowed. Personal remarks, aspersions, character assassination is not allowed.",
        "Vulgarity or bitter insinuations in presentation should be avoided. Only innocent satire or humour is expected.",
        "Following the conclusion of the skit, it is essential for the team to promptly exit the stage, ensuring that all props and personal belongings they brought are removed, leaving the stage clear and uncluttered.",
        "The item will be judged basically on the qualities like theme, work on acting, script work, dialogues and overall impression."
      ],
      prizes: {
        first: "Rs. 8,000",
        second: "Rs. 5,000",
        third: "Rs. 4,000"
      },
      contacts: []
    },
    "Dancing Jodi - Western Duo": {
      title: "DANCE",
      subtitle: "Dancing Star - Western Dance Duo",
      rules: [
        "This is a dual dance competition and must feature exactly two dancers.",
        "The choice of the genre is left to the team.",
        "The duo can be a Boy/Boy (BB), Boy/Girl (BG), or Girl/Girl (GG) pairing.",
        "The maximum duration of the performance should not exceed 4 minutes.",
        "The audio track must be submitted in pen drive to the coordinator before the event starts.",
        "The use of fire (including diyas, candles, or lighters) and water is not allowed.",
        "Film song of any language can be chosen for performance, any songs that may lead to controversies are not allowed.",
        "Any audio or track that is offensive, criticizing, or hurts others' feelings must be avoided. For example, AI-generated spoofs are not permitted.",
        "Judgement will be based on choreography, song selection, synchronization and overall performance."
      ],
      prizes: {
        first: "Rs. 4,000",
        second: "Rs. 3,000",
        third: "Rs. 2,000"
      },
      contacts: []
    },
    "Group Dance": {
      title: "DANCE",
      subtitle: "Group Dance Competition",
      rules: [
        "Participants are free to choose any genre, such as Bollywood, hip-hop, contemporary, salsa, classical, semi-classical, mass, and folk, etc.",
        "There should be a minimum of 4 members on the stage at any point of time and a maximum of 10 members per team.",
        "The maximum duration of performance is 6 minutes. An elimination round will be held if necessary.",
        "In case of using movie songs or movie references in the audio tracks, any sort of controversial elements is to be avoided.",
        "The use of fire (including diyas, candles, or lighters) and water is not allowed.",
        "Any audio or track that is offensive, criticizing, or hurts others' feelings must be avoided. For example, AI-generated spoofs are not permitted.",
        "Judgment will be based on the following: choreography, creativity in presentation, track selection, formations, costume, synchronization, and overall performance.",
        "Note: If the performance portrays any specific theme, it is strongly advised to avoid repetitive and routine themes, such as Kanchana etc. Themes are encouraged to be youth-centric, thought-provoking or crowd pulling."
      ],
      prizes: {
        first: "Rs. 15,000",
        second: "Rs. 12,000",
        third: "Rs. 8,000"
      },
      contacts: []
    },
    "Short Film Making": {
      title: "THEATRE & CINEMATOGRAPHY",
      subtitle: "Short Film Making",
      rules: [
        "Submission Method: Participants must submit their short film using the Google Drive or YouTube link provided in the registration form.",
        "Deadline: The last date for submitting the short film is January 25th, 2026 by 9:00 AM.",
        "Modification: Once submitted, no further modifications to the film are allowed.",
        "Eligibility: Only short films released between March 2025 to January 2026 are eligible for the competition.",
        "Duration: The short film duration should not exceed 15 minutes, including titles and end credits.",
        "Theme: The short film may address any theme, including social issues, fiction, love, drama, or thriller.",
        "Format: The submission must be a visually engaging video, such as a vlog, documentary, or short story that incorporates camera work.",
        "Judging Criteria: The short films will be judged based on the concept, script, acting, screenplay, narration, and overall presentation."
      ],
      prizes: {
        first: "Rs. 20,000",
        second: "Rs. 15,000",
        third: "Rs. 12,000"
      },
      contacts: []
    },
    "Haute Couture": {
      title: "FASHION COMPETITIONS",
      subtitle: "Haute Couture (Fashion Themed Ramp Walk)",
      rules: [
        "The teams should bring their own costumes and must present a theme.",
        "Teams would be awarded points on the basis of their performance in theme, Formation, Creativity in designing the Costumes & Walk.",
        "Any sort of obscenity in dressing or vulgarity in presentation will not be entertained.",
        "Any no. of teams can participate from an institute.",
        "The slot for the final event is 8 to 10 minutes.",
        "Members limit 8 to 12 for a team."
      ],
      prizes: {
        first: "Rs. 20,000",
        second: "Rs. 15,000",
        third: "Rs. 12,000"
      },
      contacts: [
        { name: "Ms. U. Varshitha", phone: "+91 8790300977" },
        { name: "Mr. Fuzel Akther", phone: "+91 9603382796" }
      ]
    }
  };

  const handleDownloadPDF = async () => {
    if (!eventData) return;
    
    setIsDownloading(true);
    try {
      const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${eventData.subtitle} - Vignan Mahotsav</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #6B46C1 0%, #8B5CF6 50%, #C084FC 100%);
            color: white;
            padding: 40px;
        }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { text-align: center; margin-bottom: 40px; }
        .header h1 { font-size: 36px; margin-bottom: 10px; }
        .header h2 { font-size: 28px; color: #E9D5FF; }
        .content { display: grid; grid-template-columns: 300px 1fr 350px; gap: 40px; }
        .poster {
            width: 250px; height: 350px; background: rgba(255,255,255,0.9);
            border: 4px solid white; border-radius: 20px;
            display: flex; align-items: center; justify-content: center;
            color: #581C87; font-weight: bold; font-size: 18px;
        }
        h3 { color: #FFD700; font-size: 24px; margin-bottom: 20px; }
        .rules-list { list-style: none; padding: 0; }
        .rules-list li { margin-bottom: 15px; display: flex; }
        .rules-list li:before { content: "•"; color: #FFD700; font-weight: bold; margin-right: 12px; }
        .prize-item { margin-bottom: 12px; font-size: 16px; }
        .prize-label { color: #FFD700; font-weight: bold; }
        .contact-item { margin-bottom: 12px; font-size: 14px; }
        @media print {
            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${eventData.title}</h1>
            <h2>${eventData.subtitle}</h2>
        </div>
        <div class="content">
            <div class="poster">POSTER of EVENT</div>
            <div>
                <h3>Rules:</h3>
                <ul class="rules-list">
                    ${eventData.rules.map(rule => `<li>${rule}</li>`).join('')}
                </ul>
            </div>
            <div>
                <h3>Cash Prizes:</h3>
                <div class="prize-item"><span class="prize-label">First:</span> ${eventData.prizes.first}</div>
                <div class="prize-item"><span class="prize-label">Second:</span> ${eventData.prizes.second}</div>
                ${eventData.prizes.third ? `<div class="prize-item"><span class="prize-label">Third:</span> ${eventData.prizes.third}</div>` : ''}
                ${eventData.prizes.fourth ? `<div class="prize-item"><span class="prize-label">Fourth:</span> ${eventData.prizes.fourth}</div>` : ''}
                <h3 style="margin-top: 30px;">Contact no:</h3>
                ${eventData.contacts.map(contact => `<div class="contact-item">${contact.name}: ${contact.phone}</div>`).join('')}
            </div>
        </div>
    </div>
</body>
</html>`;

      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${eventData.subtitle.replace(/[^a-zA-Z0-9\s]/g, '')}_Details.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      alert('✅ Event details downloaded successfully!');
    } catch (error) {
      console.error('Download error:', error);
      alert('❌ Download failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const eventData = eventDetailsData[eventName || ''];

  if (!eventData) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{
        backgroundImage: 'url("/Background-redesign.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="text-center text-white">
          <h2 className="text-4xl mb-8">Event Not Found</h2>
          <button 
            onClick={() => navigate(-1)} 
            className="text-white font-bold py-3 px-8 rounded-full transition-all duration-300 hover:text-pink-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{
      backgroundImage: 'url("/Background-redesign.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="min-h-screen p-4 md:p-8">
        {/* Header with Logo and Back Button */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <img 
              src={`${import.meta.env.BASE_URL}image.png`}
              alt="Vignan Mahotsav" 
              className="h-16 md:h-20 object-contain"
            />
            <button 
              onClick={() => navigate(-1)}
              className="text-white font-bold py-3 px-8 rounded-full transition-all duration-300 hover:text-pink-300"
            >
              ← Back
            </button>
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2" style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>
            {eventData.title}
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-purple-100" style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'}}>
            {eventData.subtitle}
          </h2>
        </div>

        {/* Content Grid */}
        <div className="flex justify-center items-center min-h-[calc(100vh-250px)]">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_350px] gap-6 max-w-7xl items-center">
          {/* Poster */}
          <div className="flex justify-center lg:justify-start">
            <div className="w-64 h-80 bg-white/90 border-4 border-white rounded-2xl flex items-center justify-center text-lg font-bold text-purple-900 text-center shadow-2xl backdrop-blur-md">
              <span>POSTER of EVENT</span>
            </div>
          </div>

          {/* Rules Section */}
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-4 text-yellow-400" style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>
              Rules:
            </h3>
            <ul className="space-y-3">
              {eventData.rules.map((rule, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-yellow-400 font-bold text-lg mt-0.5 shrink-0">•</span>
                  <span className="text-white text-sm md:text-base leading-relaxed" style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'}}>
                    {rule}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Prizes and Contact Section */}
          <div className="space-y-6">
            {/* Cash Prizes */}
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4 text-yellow-400 text-center" style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>
                Cash Prizes:
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white">
                  <span className="font-bold text-yellow-400 min-w-[80px]">First</span>
                  <span className="font-semibold">- {eventData.prizes.first}</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <span className="font-bold text-yellow-400 min-w-[80px]">Second</span>
                  <span className="font-semibold">- {eventData.prizes.second}</span>
                </div>
                {eventData.prizes.third && (
                  <div className="flex items-center gap-3 text-white">
                    <span className="font-bold text-yellow-400 min-w-[80px]">Third</span>
                    <span className="font-semibold">- {eventData.prizes.third}</span>
                  </div>
                )}
                {eventData.prizes.fourth && (
                  <div className="flex items-center gap-3 text-white">
                    <span className="font-bold text-yellow-400 min-w-[80px]">Fourth</span>
                    <span className="font-semibold">- {eventData.prizes.fourth}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4 text-yellow-400 text-center" style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>
                Contact no:
              </h3>
              <div className="space-y-3">
                {eventData.contacts.map((contact, index) => (
                  <div key={index} className="text-white text-sm md:text-base">
                    <div className="font-semibold">{contact.name}: {contact.phone}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-8 mb-8 px-4">
          <button 
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 shadow-lg text-lg min-w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleDownloadPDF}
            disabled={isDownloading}
          >
            {isDownloading ? '⏳ Downloading...' : '📄 Download PDF'}
          </button>
          
          <button 
            className="bg-pink-400 hover:bg-pink-500 text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 shadow-lg text-lg min-w-[200px]"
            onClick={() => {
              // Add to events functionality
              alert('Event added to your list!');
            }}
          >
            ⭐ Add to My Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
