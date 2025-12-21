import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import BackButton from './components/BackButton';

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
  const location = useLocation();
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Get the section we came from for smart back navigation
  const fromSection = location.state?.fromSection || '';

  // Smart back navigation handler
  const handleBack = () => {
    if (fromSection) {
      // Navigate to /events-info with the specific section to open
      navigate('/events-info', { state: { openSection: fromSection } });
    } else {
      // Default behavior - go back in history
      navigate(-1);
    }
  };

  // Event data
  const eventDetailsData: { [key: string]: EventDetailData } = {
    "Men's Athletics": {
      title: "INDIVIDUAL EVENTS",
      subtitle: "TRACK & FIELD (Men & Women)",
      rules: [
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "Everyone participant must submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "All participants must come with a proper sports attire.",
        "Sport Authority of India (SAI) rules are applicable for all Track & Field events under Men & Women categories i.e., 100 M, 400 M, 800 M, 4 X 100 M relay, 4 x 400 M relay, Short put, long Jump and 3 K for men only.",
        "Everyone should report at least 30 mins before scheduled time.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
      ],
      prizes: {
        first: "Rs. 3,000",
        second: "Rs. 2,000",
        third: "Rs. 1,000"
      },
      contacts: [
        { name: "Mr. S. Badari Ajith", phone: "+91 9346193840" },
        { name: "Mr. M. Manikanta", phone: "+91 7672069471" },
        { name: "Ms. Y. Lavanya", phone: "+91 9063809790" }
      ]
    },
    "Women's Athletics": {
      title: "INDIVIDUAL EVENTS",
      subtitle: "TRACK & FIELD (Men & Women)",
      rules: [
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "Everyone participant must submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "All participants must come with a proper sports attire.",
        "Sport Authority of India (SAI) rules are applicable for all Track & Field events under Men & Women categories i.e., 100 M, 400 M, 800 M, 4 X 100 M relay, 4 x 400 M relay, Short put, long Jump and 3 K for men only.",
        "Everyone should report at least 30 mins before scheduled time.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
      ],
      prizes: {
        first: "Rs. 3,000",
        second: "Rs. 2,000",
        third: "Rs. 1,000"
      },
      contacts: [
        { name: "Mr. S. Badari Ajith", phone: "+91 9346193840" },
        { name: "Mr. M. Manikanta", phone: "+91 7672069471" },
        { name: "Ms. Y. Lavanya", phone: "+91 9063809790" }
      ]
    },
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
    "Singing Jodi": {
      title: "MUSIC",
      subtitle: "Singing Jodi",
      rules: [
        "This is a Jodi singing competition (Each performance must feature exactly two singers).",
        "The number of accompanists should not exceed two. Karaoke is permitted only in the absence of accompanists.",
        "The maximum duration of the performance shall be 4 minutes.",
        "The maximum time for Stage/ Instruments setting is 3 minutes",
        "Film song of any language can be chosen for performance, any songs that may lead to controversies are not allowed.",
        "Judgment will be made on the qualities like, pitch, rhythm, coordination and general impression."
      ],
      prizes: {
        first: "Rs. 3,000",
        second: "Rs. 2,000",
        third: "Rs. 1,000"
      },
      contacts: []
    },
    "Classical Light Vocal Solo": {
      title: "MUSIC",
      subtitle: "Classical/Light Vocal Solo",
      rules: [
        "This is a solo singing competition for classical or light vocal music.",
        "The participant can choose any classical or light music composition.",
        "The maximum duration of the performance shall be 5 minutes.",
        "The maximum time for Stage/Instruments setting is 3 minutes.",
        "The number of accompanists should not exceed two.",
        "Judgment will be made on the qualities like pitch, rhythm, voice modulation, and overall presentation."
      ],
      prizes: {
        first: "Rs. 3,000",
        second: "Rs. 2,000",
        third: "Rs. 1,000"
      },
      contacts: []
    },
    "Western Vocal Solo": {
      title: "MUSIC",
      subtitle: "Western Vocal Solo",
      rules: [
        "This is a solo singing competition for western vocal music.",
        "The participant can choose any western song in any language.",
        "The maximum duration of the performance shall be 4 minutes.",
        "The maximum time for Stage/Instruments setting is 3 minutes.",
        "The number of accompanists should not exceed two. Karaoke is permitted only in the absence of accompanists.",
        "Judgment will be made on the qualities like pitch, rhythm, voice quality, stage presence, and overall performance."
      ],
      prizes: {
        first: "Rs. 3,000",
        second: "Rs. 2,000",
        third: "Rs. 1,000"
      },
      contacts: []
    },
    "Anthyakshari Duo": {
      title: "MUSIC",
      subtitle: "Anthyakshari Duo",
      rules: [
        "This is a duo singing competition in Anthyakshari format (Each team must have exactly two participants).",
        "Participants will sing songs based on letters or themes provided by the coordinators.",
        "The maximum time for each round shall be as decided by the coordinators.",
        "Songs can be in any Indian language.",
        "Film songs as well as non-film songs are allowed.",
        "Judgment will be based on quickness, accuracy, voice quality, and overall performance."
      ],
      prizes: {
        first: "Rs. 3,000",
        second: "Rs. 2,000",
        third: "Rs. 1,000"
      },
      contacts: []
    },
    "Instrumental Solo": {
      title: "MUSIC",
      subtitle: "Instrumental Solo",
      rules: [
        "This is a solo instrumental music competition.",
        "Participants can play any instrument of their choice (Indian or Western).",
        "The maximum duration of the performance shall be 5 minutes.",
        "The maximum time for Stage/Instruments setting is 3 minutes.",
        "The number of accompanists should not exceed one.",
        "Judgment will be made on the qualities like rhythm, melody, technique, and overall impression."
      ],
      prizes: {
        first: "Rs. 3,000",
        second: "Rs. 2,000",
        third: "Rs. 1,000"
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
    "Mime": {
      title: "THEATRE & CINEMATOGRAPHY",
      subtitle: "Mime",
      rules: [
        "Minimum 3 and Maximum of 8 participants are allowed to participate in a team.",
        "Judgment will most likely be based on the qualities like idea, creativity of presentation, use of make-up, general impression.",
        "Duration of performance shall be for maximum of 5 minutes.",
        "Background music with no vocals is allowed."
      ],
      prizes: {
        first: "Rs. 6,000",
        second: "Rs. 4,000",
        third: "Rs. 2,000"
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
    "Spot Dance - Jodi": {
      title: "DANCE",
      subtitle: "Spot Dance - Jodi",
      rules: [
        "This is a dual spot dance competition and must feature exactly two dancers.",
        "The duo can be a Boy/Boy (BB), Boy/Girl (BG), or Girl/Girl (GG) pairing.",
        "Participants must dance to the music provided on the spot by the coordinators.",
        "The genre and song will be unknown to participants before the performance.",
        "The maximum duration of the performance will be determined by the coordinators.",
        "Participants should report at least 30 minutes before the scheduled time.",
        "Judgment will be based on spontaneity, rhythm, coordination, and overall performance."
      ],
      prizes: {
        first: "Rs. 3,000",
        second: "Rs. 2,000",
        third: "Rs. 1,000"
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
    "Mono Action": {
      title: "THEATRE & CINEMATOGRAPHY",
      subtitle: "Mono Action",
      rules: [
        "This is a solo acting performance where one participant portrays multiple characters.",
        "The maximum duration of the performance shall be 5 minutes.",
        "Props and background music are allowed but should be minimal.",
        "The performance should showcase the participant's ability to switch between different characters seamlessly.",
        "The use of make-up and costume changes is allowed within the time limit.",
        "Judgment will be based on acting skills, character portrayal, voice modulation, expression, and overall presentation."
      ],
      prizes: {
        first: "Rs. 4,000",
        second: "Rs. 3,000",
        third: "Rs. 2,000"
      },
      contacts: []
    },
    "Spot Ad Making": {
      title: "THEATRE & CINEMATOGRAPHY",
      subtitle: "On the Spot Ad Making",
      rules: [
        "Teams should consist of a minimum of 3 and a maximum of 6 participants.",
        "The topic/product for the advertisement will be given on the spot.",
        "Participants will be given 30 minutes for preparation.",
        "The maximum duration of the advertisement performance shall be 3 minutes.",
        "Props are allowed, but teams must arrange them within the preparation time.",
        "The advertisement should be creative, engaging, and effectively promote the given product/topic.",
        "Judgment will be based on creativity, presentation, teamwork, message delivery, and entertainment value."
      ],
      prizes: {
        first: "Rs. 5,000",
        second: "Rs. 4,000",
        third: "Rs. 3,000"
      },
      contacts: []
    },
    "Dialogue Dhamaka": {
      title: "THEATRE & CINEMATOGRAPHY",
      subtitle: "Dialogue Dhamaka (Hindi)",
      rules: [
        "This is a solo dialogue delivery competition in Hindi language.",
        "Participants can choose dialogues from movies, plays, or their own creations.",
        "The maximum duration of the performance shall be 3 minutes.",
        "Props and background music are allowed but should complement the dialogue delivery.",
        "The performance should showcase powerful delivery, emotion, and expression.",
        "Judgment will be based on voice modulation, expression, dialogue selection, impact, and overall performance."
      ],
      prizes: {
        first: "Rs. 3,000",
        second: "Rs. 2,000",
        third: "Rs. 1,000"
      },
      contacts: []
    },
    "Master Orator": {
      title: "LITERATURE",
      subtitle: "Master Orator",
      rules: [
        "This is a solo public speaking competition.",
        "Participants will be given a topic on the spot.",
        "Preparation time: 5 minutes.",
        "The maximum duration of the speech shall be 3-5 minutes.",
        "Participants can speak in English, Hindi, or Telugu.",
        "The speech should be well-structured with introduction, body, and conclusion.",
        "Judgment will be based on content, delivery, confidence, language proficiency, and overall impact."
      ],
      prizes: {
        first: "Rs. 3,000",
        second: "Rs. 2,000",
        third: "Rs. 1,000"
      },
      contacts: []
    },
    "On Spot Creative Content Writing": {
      title: "LITERATURE",
      subtitle: "Spot Creative Writing",
      rules: [
        "This is an individual creative writing competition.",
        "Topic will be given on the spot.",
        "Participants can write in English, Hindi, or Telugu.",
        "Duration: 1 hour for writing.",
        "The content can be in the form of a story, essay, poem, or article.",
        "Handwritten entries only. Pen and paper will be provided.",
        "Judgment will be based on creativity, language, expression, originality, and relevance to the topic."
      ],
      prizes: {
        first: "Rs. 3,000",
        second: "Rs. 2,000",
        third: "Rs. 1,000"
      },
      contacts: []
    },
    "Telugu Vyaasa Rachana": {
      title: "LITERATURE",
      subtitle: "Telugu Vyaasa Rachana",
      rules: [
        "This is a Telugu essay writing competition.",
        "Topic will be given on the spot.",
        "Duration: 1 hour for writing.",
        "Handwritten entries only. Pen and paper will be provided.",
        "The essay should be written only in Telugu language.",
        "Judgment will be based on content quality, language proficiency, expression, and relevance to the topic."
      ],
      prizes: {
        first: "Rs. 3,000",
        second: "Rs. 2,000",
        third: "Rs. 1,000"
      },
      contacts: []
    },
    "Shayari - Hindi": {
      title: "LITERATURE",
      subtitle: "Shayari - Hindi",
      rules: [
        "This is a Hindi Shayari recitation competition.",
        "Participants can present their own creation or famous Shayari.",
        "The maximum duration of the performance shall be 3 minutes.",
        "The Shayari must be in Hindi language only.",
        "Participants should focus on emotion, expression, and delivery.",
        "Judgment will be based on content, voice modulation, expression, and overall presentation."
      ],
      prizes: {
        first: "Rs. 3,000",
        second: "Rs. 2,000",
        third: "Rs. 1,000"
      },
      contacts: []
    },
    "JAM": {
      title: "LITERATURE",
      subtitle: "JAM (Just A Minute)",
      rules: [
        "This is an impromptu speaking competition.",
        "Participants will be given a topic and must speak continuously for one minute.",
        "Repetition, hesitation, and deviation from the topic will lead to point deduction.",
        "Participants can speak in English or Hindi.",
        "Multiple rounds will be conducted to determine the winner.",
        "Judgment will be based on fluency, presence of mind, vocabulary, and adherence to rules."
      ],
      prizes: {
        first: "Rs. 3,000",
        second: "Rs. 2,000",
        third: "Rs. 1,000"
      },
      contacts: []
    },
    "Dumb Charades": {
      title: "LITERATURE",
      subtitle: "Dumb Charades",
      rules: [
        "This is a team event with 2 participants per team.",
        "One participant will act out movie names/phrases without speaking while the other guesses.",
        "Movie names can be from any language (Hindi, Telugu, English, etc.).",
        "Time limit for each round will be decided by coordinators.",
        "Teams will compete in multiple rounds.",
        "Judgment will be based on correct guesses within the time limit."
      ],
      prizes: {
        first: "Rs. 3,000",
        second: "Rs. 2,000",
        third: "Rs. 1,000"
      },
      contacts: []
    },
    "Quiz": {
      title: "LITERATURE",
      subtitle: "Quiz Wiz",
      rules: [
        "This is a team quiz competition with 3 participants per team.",
        "Questions will cover various topics including general knowledge, current affairs, science, sports, entertainment, etc.",
        "Multiple rounds will be conducted (written, buzzer, rapid fire, etc.).",
        "Teams should maintain discipline and follow quiz etiquette.",
        "Umpire's decision will be final.",
        "Judgment will be based on correct answers and speed."
      ],
      prizes: {
        first: "Rs. 5,000",
        second: "Rs. 3,000",
        third: "Rs. 2,000"
      },
      contacts: []
    },
    "Word Master": {
      title: "LITERATURE",
      subtitle: "Word Master",
      rules: [
        "This is an individual word game competition.",
        "Participants will compete in word-building, vocabulary, and language skills challenges.",
        "Rounds may include word chain, scrabble-style games, crosswords, or similar activities.",
        "Time limits will be specified for each round.",
        "Participants should have strong vocabulary and quick thinking.",
        "Judgment will be based on correct words, speed, and creativity."
      ],
      prizes: {
        first: "Rs. 3,000",
        second: "Rs. 2,000",
        third: "Rs. 1,000"
      },
      contacts: []
    },
    "Story telling": {
      title: "LITERATURE",
      subtitle: "Story Telling",
      rules: [
        "This is a solo storytelling competition.",
        "Participants can narrate a story of their choice (folk tale, moral story, personal experience, or fiction).",
        "The maximum duration of the performance shall be 5 minutes.",
        "Stories can be narrated in English, Hindi, or Telugu.",
        "Use of props and expressions is encouraged.",
        "Judgment will be based on storytelling skills, voice modulation, expression, engagement, and overall presentation."
      ],
      prizes: {
        first: "Rs. 3,000",
        second: "Rs. 2,000",
        third: "Rs. 1,000"
      },
      contacts: []
    },
    "Theme Painting": {
      title: "VISUAL ARTS",
      subtitle: "Theme Painting",
      rules: [
        "This is an individual painting competition.",
        "Theme will be announced on the spot.",
        "Duration: 2 hours.",
        "Canvas/drawing sheet will be provided.",
        "Participants must bring their own painting materials (watercolors, acrylics, oil paints, brushes, etc.).",
        "The painting should be based on the given theme.",
        "Judgment will be based on creativity, color usage, theme interpretation, and overall presentation."
      ],
      prizes: {
        first: "Rs. 4,000",
        second: "Rs. 3,000",
        third: "Rs. 2,000"
      },
      contacts: []
    },
    "Clay Modelling": {
      title: "VISUAL ARTS",
      subtitle: "Clay Modelling",
      rules: [
        "This is an individual clay modeling competition.",
        "Theme will be announced on the spot.",
        "Duration: 2 hours.",
        "Clay will be provided by the organizers.",
        "Participants can bring their own modeling tools.",
        "The model should be based on the given theme.",
        "Judgment will be based on creativity, skill, theme interpretation, and finishing."
      ],
      prizes: {
        first: "Rs. 4,000",
        second: "Rs. 3,000",
        third: "Rs. 2,000"
      },
      contacts: []
    },
    "Rangoli": {
      title: "VISUAL ARTS",
      subtitle: "Rangoli",
      rules: [
        "This is a team event with 2 participants per team.",
        "Theme will be announced on the spot.",
        "Duration: 2 hours.",
        "Space will be provided for creating the rangoli.",
        "Teams must bring their own rangoli colors, flowers, or materials.",
        "The rangoli should be based on the given theme.",
        "Judgment will be based on creativity, color combination, design, and neatness."
      ],
      prizes: {
        first: "Rs. 4,000",
        second: "Rs. 3,000",
        third: "Rs. 2,000"
      },
      contacts: []
    },
    "Mehandi": {
      title: "VISUAL ARTS",
      subtitle: "Mehandi (Henna Art)",
      rules: [
        "This is a team event with 2 participants (one artist and one model).",
        "Duration: 1.5 hours.",
        "Mehandi cones and other materials must be brought by the participants.",
        "The design should be creative and intricate.",
        "Judgment will be based on design complexity, neatness, creativity, and overall presentation."
      ],
      prizes: {
        first: "Rs. 3,000",
        second: "Rs. 2,000",
        third: "Rs. 1,000"
      },
      contacts: []
    },
    "Collage": {
      title: "VISUAL ARTS",
      subtitle: "Collage",
      rules: [
        "This is an individual collage making competition.",
        "Theme will be announced on the spot.",
        "Duration: 1.5 hours.",
        "Chart paper will be provided.",
        "Participants must bring their own materials (magazines, newspapers, colors, glue, scissors, etc.).",
        "The collage should be based on the given theme.",
        "Judgment will be based on creativity, theme interpretation, arrangement, and overall presentation."
      ],
      prizes: {
        first: "Rs. 3,000",
        second: "Rs. 2,000",
        third: "Rs. 1,000"
      },
      contacts: []
    },
    "Face Painting": {
      title: "VISUAL ARTS",
      subtitle: "Face Painting",
      rules: [
        "This is a team event with 2 participants (one artist and one model).",
        "Theme will be announced on the spot.",
        "Duration: 1 hour.",
        "Participants must bring their own face painting colors and brushes.",
        "Only face painting is allowed (no body painting).",
        "The design should be based on the given theme.",
        "Judgment will be based on creativity, skill, theme interpretation, and overall presentation."
      ],
      prizes: {
        first: "Rs. 3,000",
        second: "Rs. 2,000",
        third: "Rs. 1,000"
      },
      contacts: []
    },
    "Pencil Sketching": {
      title: "VISUAL ARTS",
      subtitle: "Pencil Sketching",
      rules: [
        "This is an individual pencil sketching competition.",
        "Theme will be announced on the spot.",
        "Duration: 1.5 hours.",
        "Drawing sheet will be provided.",
        "Participants must bring their own pencils, erasers, and shading tools.",
        "Only pencil sketching is allowed (no colors).",
        "Judgment will be based on creativity, shading, proportion, theme interpretation, and overall presentation."
      ],
      prizes: {
        first: "Rs. 3,000",
        second: "Rs. 2,000",
        third: "Rs. 1,000"
      },
      contacts: []
    },
    "Mandala Art": {
      title: "VISUAL ARTS",
      subtitle: "Mandala Art",
      rules: [
        "This is an individual mandala art competition.",
        "Duration: 2 hours.",
        "Drawing sheet will be provided.",
        "Participants must bring their own materials (pens, pencils, colors, etc.).",
        "The mandala design should be intricate and symmetric.",
        "Judgment will be based on complexity, symmetry, creativity, neatness, and overall presentation."
      ],
      prizes: {
        first: "Rs. 3,000",
        second: "Rs. 2,000",
        third: "Rs. 1,000"
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
    },
    "Craftvilla": {
      title: "FASHION COMPETITIONS",
      subtitle: "Craft Villa (Accessory Design)",
      rules: [
        "This is an individual or team event (maximum 2 participants).",
        "Participants need to create fashion accessories using crafts.",
        "Duration: 2 hours.",
        "Participants must bring their own materials.",
        "Accessories can include jewelry, bags, headbands, belts, or any wearable items.",
        "The design should be creative, wearable, and aesthetically appealing.",
        "Judgment will be based on creativity, craftsmanship, design, and overall presentation."
      ],
      prizes: {
        first: "Rs. 10,000",
        second: "Rs. 7,000",
        third: "Rs. 5,000"
      },
      contacts: []
    },
    "Texart": {
      title: "FASHION COMPETITIONS",
      subtitle: "Texart (Fashion Sketching)",
      rules: [
        "This is an individual fashion sketching competition.",
        "Theme will be announced on the spot.",
        "Duration: 2 hours.",
        "Drawing sheet will be provided.",
        "Participants must bring their own sketching and coloring materials.",
        "The sketch should showcase fashion design concepts based on the theme.",
        "Judgment will be based on creativity, design concept, sketching skills, and overall presentation."
      ],
      prizes: {
        first: "Rs. 8,000",
        second: "Rs. 6,000",
        third: "Rs. 4,000"
      },
      contacts: []
    },
    "T-Shirt Designing": {
      title: "FASHION COMPETITIONS",
      subtitle: "T-Shirt Designing",
      rules: [
        "This is an individual T-shirt designing competition.",
        "Theme will be announced on the spot.",
        "Duration: 2 hours.",
        "Plain T-shirt will be provided.",
        "Participants must bring their own fabric colors, brushes, and designing materials.",
        "The design should be creative and based on the given theme.",
        "Judgment will be based on creativity, theme interpretation, color usage, and overall design."
      ],
      prizes: {
        first: "Rs. 8,000",
        second: "Rs. 6,000",
        third: "Rs. 4,000"
      },
      contacts: []
    },
    "Mahotsav Got Talent": {
      title: "SPOT LIGHT",
      subtitle: "Mahotsav Got Talent",
      rules: [
        "This is an open talent show where participants can showcase any unique talent.",
        "The performance can be solo or group (maximum 5 participants).",
        "The maximum duration of the performance shall be 5 minutes.",
        "Participants can perform magic, mimicry, beatboxing, stand-up comedy, unique musical performances, or any other special talent.",
        "Participants must bring their own props if required.",
        "Judgment will be based on uniqueness, skill level, entertainment value, and overall performance."
      ],
      prizes: {
        first: "Rs. 10,000",
        second: "Rs. 7,000",
        third: "Rs. 5,000"
      },
      contacts: []
    },
    "Mr. and Ms. Mahotsav": {
      title: "SPOT LIGHT",
      subtitle: "Mr. and Ms. Mahotsav",
      rules: [
        "This is an individual personality competition for male and female categories.",
        "Participants will go through multiple rounds including introduction, talent round, question-answer, and ramp walk.",
        "Participants should come in formal/ethnic attire for introduction round.",
        "Talent round: Showcase any talent (singing, dancing, mimicry, etc.) - 2 minutes max.",
        "Participants should be confident, well-spoken, and presentable.",
        "Judgment will be based on personality, confidence, talent, communication skills, and overall presence."
      ],
      prizes: {
        first: "Rs. 15,000",
        second: "Rs. 10,000",
        third: "Rs. 7,000"
      },
      contacts: []
    },
    "Online Photography": {
      title: "DIGITAL STORYTELLING & CREATIVE MEDIA",
      subtitle: "Theme Photography (Online)",
      rules: [
        "This is an online photography competition.",
        "Theme will be announced on the event page.",
        "Participants must submit their photographs via Google Form link provided.",
        "Submission deadline will be announced.",
        "Maximum 3 photographs can be submitted per participant.",
        "Photographs should be original and clicked by the participant only.",
        "Basic editing is allowed, but heavy manipulation is not permitted.",
        "Judgment will be based on creativity, composition, theme interpretation, and technical quality."
      ],
      prizes: {
        first: "Rs. 5,000",
        second: "Rs. 3,000",
        third: "Rs. 2,000"
      },
      contacts: []
    },
    "Digital Poster Making": {
      title: "DIGITAL STORYTELLING & CREATIVE MEDIA",
      subtitle: "Digital Poster Making",
      rules: [
        "This is an individual digital poster making competition.",
        "Theme will be announced on the spot.",
        "Duration: 2 hours.",
        "Participants must bring their own laptops with design software installed.",
        "The poster should be created digitally using tools like Photoshop, Illustrator, Canva, or any design software.",
        "Final submission should be in JPG/PNG format with minimum 300 DPI resolution.",
        "Judgment will be based on creativity, design, theme interpretation, and visual impact."
      ],
      prizes: {
        first: "Rs. 5,000",
        second: "Rs. 3,000",
        third: "Rs. 2,000"
      },
      contacts: []
    },
    "Mahotsav Digital Chronicle": {
      title: "DIGITAL STORYTELLING & CREATIVE MEDIA",
      subtitle: "Mahotsav Digital Chronicle",
      rules: [
        "This is a team event (2-3 participants) to document the Mahotsav event.",
        "Teams will capture the essence of Mahotsav through photos, videos, and creative content.",
        "The chronicle can be in the form of a digital magazine, blog, vlog, or social media content series.",
        "Teams must submit their final chronicle by the end of the event.",
        "Content should be original and captured during the Mahotsav event.",
        "Judgment will be based on creativity, coverage, storytelling, and overall presentation."
      ],
      prizes: {
        first: "Rs. 10,000",
        second: "Rs. 7,000",
        third: "Rs. 5,000"
      },
      contacts: []
    },
    "Reel Making": {
      title: "DIGITAL STORYTELLING & CREATIVE MEDIA",
      subtitle: "Reel Making",
      rules: [
        "This is an individual or duo reel making competition.",
        "Theme will be announced on the spot.",
        "Duration: Maximum 60 seconds per reel.",
        "Participants must create and edit the reel during the event (2 hours editing time).",
        "The reel should be creative, engaging, and based on the given theme.",
        "Participants must bring their own phones/cameras for shooting and editing.",
        "Judgment will be based on creativity, editing skills, theme interpretation, and engagement factor."
      ],
      prizes: {
        first: "Rs. 5,000",
        second: "Rs. 3,000",
        third: "Rs. 2,000"
      },
      contacts: []
    },
    "Valorant": {
      title: "GAMING",
      subtitle: "Valorant (PC)",
      rules: [
        "This is a team-based tactical shooter game competition.",
        "Team size: 5 players per team.",
        "Tournament format will be announced by coordinators (knockout/league).",
        "All matches will be played on the provided PCs.",
        "Players must report 30 minutes before their scheduled match.",
        "Standard Valorant competitive rules apply.",
        "Use of any cheats, hacks, or exploits will lead to immediate disqualification.",
        "Coordinator's decision will be final."
      ],
      prizes: {
        first: "Rs. 15,000",
        second: "Rs. 10,000",
        third: "Rs. 7,000"
      },
      contacts: []
    },
    "E-Football": {
      title: "GAMING",
      subtitle: "E-Football (PC)",
      rules: [
        "This is an individual e-football gaming competition.",
        "Game: EA Sports FC or eFootball (will be specified).",
        "Tournament format: Knockout basis.",
        "All matches will be played on the provided PCs.",
        "Match duration: Standard game time settings.",
        "Players must report 30 minutes before their scheduled match.",
        "No external controllers allowed unless specified by coordinators.",
        "Coordinator's decision will be final."
      ],
      prizes: {
        first: "Rs. 10,000",
        second: "Rs. 7,000",
        third: "Rs. 5,000"
      },
      contacts: []
    },
    "Counter Strike": {
      title: "GAMING",
      subtitle: "Counter Strike (PC)",
      rules: [
        "This is a team-based first-person shooter game competition.",
        "Team size: 5 players per team.",
        "Game: Counter-Strike 2 or CS:GO (will be specified).",
        "Tournament format will be announced by coordinators.",
        "All matches will be played on the provided PCs.",
        "Players must report 30 minutes before their scheduled match.",
        "Standard CS competitive rules apply.",
        "Use of any cheats, hacks, or exploits will lead to immediate disqualification.",
        "Coordinator's decision will be final."
      ],
      prizes: {
        first: "Rs. 15,000",
        second: "Rs. 10,000",
        third: "Rs. 7,000"
      },
      contacts: []
    },
    "Smash Karts": {
      title: "GAMING",
      subtitle: "Smash Karts (PC)",
      rules: [
        "This is an individual kart racing game competition.",
        "Tournament format: Multiple rounds with point system.",
        "All matches will be played on the provided PCs.",
        "Players must report 30 minutes before their scheduled match.",
        "Standard game rules apply.",
        "Coordinator's decision will be final."
      ],
      prizes: {
        first: "Rs. 8,000",
        second: "Rs. 5,000",
        third: "Rs. 3,000"
      },
      contacts: []
    },
    "Line Follower Robot": {
      title: "ROBO WARS & GAMING",
      subtitle: "Line Follower Robot",
      rules: [
        "This is a team event (maximum 4 members per team).",
        "Robots must follow a black line on a white surface autonomously.",
        "The robot that completes the track in minimum time wins.",
        "Robot specifications and track details will be provided before the event.",
        "Teams must bring their own robots.",
        "The robot should be completely autonomous (no manual control during the run).",
        "Multiple rounds may be conducted.",
        "Any robot causing damage to the track will be disqualified.",
        "Coordinator's decision will be final."
      ],
      prizes: {
        first: "Rs. 10,000",
        second: "Rs. 7,000",
        third: "Rs. 5,000"
      },
      contacts: []
    },
    "Bot Wrestling": {
      title: "ROBO WARS & GAMING",
      subtitle: "Bot Wrestling",
      rules: [
        "This is a team event (maximum 4 members per team).",
        "Two robots compete in a wrestling arena to push the opponent out or immobilize them.",
        "Robot weight and dimension specifications will be provided before the event.",
        "Teams must bring their own robots.",
        "Both wired and wireless robots are allowed.",
        "Use of flame-throwers, liquids, or hazardous materials is strictly prohibited.",
        "Tournament format: Knockout basis.",
        "Match duration will be specified by coordinators.",
        "Coordinator's decision will be final."
      ],
      prizes: {
        first: "Rs. 12,000",
        second: "Rs. 8,000",
        third: "Rs. 5,000"
      },
      contacts: []
    },
    "Robo Races": {
      title: "ROBO WARS & GAMING",
      subtitle: "Robo Races",
      rules: [
        "This is a team event (maximum 4 members per team).",
        "Robots must complete a racing track with obstacles in minimum time.",
        "Robot specifications and track details will be provided before the event.",
        "Teams must bring their own robots.",
        "Both wired and wireless robots are allowed.",
        "The robot can be manually controlled or autonomous.",
        "Multiple rounds may be conducted.",
        "Any robot causing damage to the track will be disqualified.",
        "Coordinator's decision will be final."
      ],
      prizes: {
        first: "Rs. 10,000",
        second: "Rs. 7,000",
        third: "Rs. 5,000"
      },
      contacts: []
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
            onClick={handleBack} 
            className="text-white font-bold py-3 px-8 rounded-full transition-all duration-300 hover:text-pink-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen event-detail-page" style={{
      backgroundImage: 'url("/Background-redesign.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="min-h-screen p-4 md:p-8">
        {/* Header: Logo + Back Button + Title */}
        <div className="mb-8">
          {/* Desktop layout */}
          <div className="hidden md:grid md:grid-cols-3 md:items-start mb-6">
            {/* Left column: Logo and Back button stacked */}
            <div className="flex flex-col items-start gap-3">
              <img 
                src={`${import.meta.env.BASE_URL}image.png`}
                alt="Vignan Mahotsav" 
                style={{height: '5rem', objectFit: 'contain', marginTop: '-3rem'}}
              />
              <BackButton 
                className="!static !top-auto !left-auto"
                onClick={handleBack}
              />
            </div>
            
            {/* Center column: Title */}
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '32px'}}>
              <h1 style={{fontSize: '2.25rem', fontWeight: 'bold', color: 'white', marginBottom: '8px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', fontFamily: 'Woodtrap, sans-serif'}}>
                {eventData.title}
              </h1>
              <h2 style={{fontSize: '1.875rem', fontWeight: '600', color: '#e9d5ff', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)', fontFamily: 'Woodtrap, sans-serif'}}>
                {eventData.subtitle}
              </h2>
            </div>
            
            {/* Right column: Empty (for balance) */}
            <div></div>
          </div>

          {/* Mobile layout */}
          <div className="md:hidden flex flex-col items-center gap-3 mb-6 pt-0">
            <BackButton 
              className="!static !top-auto !left-auto"
              onClick={handleBack}
            />
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-2" style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', fontFamily: 'Woodtrap, sans-serif'}}>
                {eventData.title}
              </h1>
              <h2 className="text-2xl font-semibold text-purple-100" style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)', fontFamily: 'Woodtrap, sans-serif'}}>
                {eventData.subtitle}
              </h2>
            </div>
          </div>
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
            <h3 className="text-2xl font-bold mb-6 text-yellow-400" style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', fontFamily: 'Woodtrap, sans-serif'}}>
              Rules:
            </h3>
            <ul className="space-y-5">
              {eventData.rules.map((rule, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="text-yellow-400 font-bold text-lg mt-1 shrink-0">•</span>
                  <span className="text-white text-base md:text-lg leading-loose" style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)', fontFamily: 'BackToSchool, sans-serif', letterSpacing: '0.02em'}}>
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
              <h3 className="text-2xl font-bold mb-4 text-yellow-400 text-center" style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', fontFamily: 'Woodtrap, sans-serif'}}>
                Cash Prizes:
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white">
                  <span className="font-bold text-yellow-400 min-w-[80px]" style={{fontFamily: 'BackToSchool, sans-serif', fontSize: '1.125rem'}}>First</span>
                  <span className="font-semibold" style={{fontFamily: 'BackToSchool, sans-serif', fontSize: '1.125rem'}}>- {eventData.prizes.first}</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <span className="font-bold text-yellow-400 min-w-[80px]" style={{fontFamily: 'BackToSchool, sans-serif', fontSize: '1.125rem'}}>Second</span>
                  <span className="font-semibold" style={{fontFamily: 'BackToSchool, sans-serif', fontSize: '1.125rem'}}>- {eventData.prizes.second}</span>
                </div>
                {eventData.prizes.third && (
                  <div className="flex items-center gap-3 text-white">
                    <span className="font-bold text-yellow-400 min-w-[80px]" style={{fontFamily: 'BackToSchool, sans-serif', fontSize: '1.125rem'}}>Third</span>
                    <span className="font-semibold" style={{fontFamily: 'BackToSchool, sans-serif', fontSize: '1.125rem'}}>- {eventData.prizes.third}</span>
                  </div>
                )}
                {eventData.prizes.fourth && (
                  <div className="flex items-center gap-3 text-white">
                    <span className="font-bold text-yellow-400 min-w-[80px]" style={{fontFamily: 'BackToSchool, sans-serif', fontSize: '1.125rem'}}>Fourth</span>
                    <span className="font-semibold" style={{fontFamily: 'BackToSchool, sans-serif', fontSize: '1.125rem'}}>- {eventData.prizes.fourth}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4 text-yellow-400 text-center" style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', fontFamily: 'Woodtrap, sans-serif'}}>
                Contact no:
              </h3>
              <div className="space-y-3">
                {eventData.contacts.map((contact, index) => (
                  <div key={index} className="text-white text-sm md:text-base">
                    <div className="font-semibold" style={{fontFamily: 'BackToSchool, sans-serif'}}>{contact.name}: {contact.phone}</div>
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
            {isDownloading ? '⏳ Downloading...' : '📄 Download'}
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
