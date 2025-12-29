import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import BackButton from './components/BackButton';
import FlowerComponent from './components/FlowerComponent';

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
    "Athletics": {
      title: "INDIVIDUAL EVENTS",
      subtitle: "TRACK & FIELD (Men & Women)",
      rules: [
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "Everyone participant must submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "All participants must come with a proper sports attire.",
        "Sport Authority of India (SAI) rules are applicable for all Track & Field events under Men & Women categories i.e., 100 M, 400 M, 800 M, 4 X 100 M relay, 4 x 400 M relay, Short put, long Jump and 3 K for men only.",
        "Everyone should report at least 30 mins before scheduled time.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team.",
        "Prize Money - Men: 1st Rs.3,000 | 2nd Rs.2,000 | 3rd Rs.1,000",
        "Prize Money - Women: 1st Rs.3,000 | 2nd Rs.2,000 | 3rd Rs.1,000"
      ],
      prizes: {
        first: "Rs. 3,000",
        second: "Rs. 2,000",
        third: "Rs. 1,000"
      },
      contacts: [
        { name: "Ms. Md.Karishma", phone: "+91 73868 57843" },
        { name: "Mr. G.Srinu", phone: "+91 93928 34630" },
        { name: "Ms. Hima", phone: "+91 85208 22204" },
        { name: "Mr. Hemanth", phone: "+91 74160 65745" },
        { name: "Mr. S.Rathna Prabhooth ", phone: "+91 63030 13174" },
        { name: "Ms. M. Venkata swamy", phone: "+91 83176 56282" }
  
      ]
    },
    "Men's Athletics": {
      title: "INDIVIDUAL EVENTS",
      subtitle: "TRACK & FIELD (Men & Women)",
      rules: [
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "Everyone participant must submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "All participants must come with a proper sports attire.",
        "Sport Authority of India (SAI) rules are applicable for all Track & Field events under Men & Women categories i.e., 100 M, 400 M, 800 M, 800 M, 4 X 100 M relay, 4 x 400 M relay, Short put, long Jump and 3 K for men only.",
        "Everyone should report at least 30 mins before scheduled time.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
      ],
      prizes: {
        first: "Rs. 3,000",
        second: "Rs. 2,000",
        third: "Rs. 1,000"
      },
      contacts: [
        { name: "Ms. Md.Karishma", phone: "+91 73868 57843" },
        { name: "Mr. G.Srinu", phone: "+91 93928 34630" },
        { name: "Ms. Hima", phone: "+91 85208 22204" },
        { name: "Mr. Hemanth", phone: "+91 74160 65745" },
        { name: "Mr. S.Rathna Prabhooth ", phone: "+91 63030 13174" },
        { name: "Ms. M. Venkata swamy", phone: "+91 83176 56282" }
  
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
        { name: "Ms. Md.Karishma", phone: "+91 73868 57843" },
        { name: "Mr. G.Srinu", phone: "+91 93928 34630" },
        { name: "Ms. Hima", phone: "+91 85208 22204" },
        { name: "Mr. Hemanth", phone: "+91 74160 65745" },
        { name: "Mr. S.Rathna Prabhooth ", phone: "+91 63030 13174" },
        { name: "Ms. M. Venkata swamy", phone: "+91 83176 56282" }
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
         { name: "Mr. H. Harshith", phone: "+91 80191 71205" },
        { name: "Mr. S. Siva Subrahmanyam", phone: "+91 93479 10733" },
        { name: "Ms. N. Nirimitha", phone: "+91 75697 17808" },
        { name: "Ms. G. Gayathri", phone: "+91 93929 60026" },
        { name: "Ms. S. Sowmya", phone: "+91 70136 39789" }
      
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
         { name: "Mr. H. Harshith", phone: "+91 80191 71205" },
        { name: "Mr. S. Siva Subrahmanyam", phone: "+91 93479 10733" },
        { name: "Ms. N. Nirimitha", phone: "+91 75697 17808" },
        { name: "Ms. G. Gayathri", phone: "+91 93929 60026" },
        { name: "Ms. S. Sowmya", phone: "+91 70136 39789" }
  
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
         { name: "Mr. H. Harshith", phone: "+91 80191 71205" },
        { name: "Mr. S. Siva Subrahmanyam", phone: "+91 93479 10733" },
        { name: "Ms. N. Nirimitha", phone: "+91 75697 17808" },
        { name: "Ms. G. Gayathri", phone: "+91 93929 60026" },
        { name: "Ms. S. Sowmya", phone: "+91 70136 39789" }
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
         { name: "Mr. H. Harshith", phone: "+91 80191 71205" },
        { name: "Mr. S. Siva Subrahmanyam", phone: "+91 93479 10733" },
        { name: "Ms. N. Nirimitha", phone: "+91 75697 17808" },
        { name: "Ms. G. Gayathri", phone: "+91 93929 60026" },
        { name: "Ms. S. Sowmya", phone: "+91 70136 39789" }
    
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
        { name: "Mr. H. Harshith", phone: "+91 80191 71205" },
        { name: "Mr. S. Siva Subrahmanyam", phone: "+91 93479 10733" },
        { name: "Ms. N. Nirimitha", phone: "+91 75697 17808" },
        { name: "Ms. G. Gayathri", phone: "+91 93929 60026" },
        { name: "Ms. S. Sowmya", phone: "+91 70136 39789" }
      
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
        { name: "Mr. H. Harshith", phone: "+91 80191 71205" },
        { name: "Mr. S. Siva Subrahmanyam", phone: "+91 93479 10733" },
        { name: "Ms. N. Nirimitha", phone: "+91 75697 17808" },
        { name: "Ms. G. Gayathri", phone: "+91 93929 60026" },
        { name: "Ms. S. Sowmya", phone: "+91 70136 39789" }
      ]
    },
    "Para Sports": {
      title: "INDIVIDUAL EVENTS",
      subtitle: "PARA SPORTS (MEN)",
      rules: [
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "Everyone participant must submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "In Para sports only two events: 100Mts, 400Mts (Men only) under Hand amputee, Leg amputee and visual impairment categories.",
        "Players must report at least before 30 minutes at respective grounds.",
        "All participants must come with a proper sports attire.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500"
      },
      contacts: [
        { name: "Mr. S. Badari Ajith", phone: "+91 93461 93840" },
        { name: "Mr. M. Manikanta", phone: "+91 76720 69471" }
      ]
    },
    "Para Cricket": {
      title: "INDIVIDUAL EVENTS",
      subtitle: "PARA CRICKET (MEN)",
      rules: [
        "Vignan Mahotsav Player Registration ID Card must be submitted to coordinators before participation for verification.",
        "Everyone participant must submit a Bonafide certificate from the Head of institution/ Physical Director with Stamp at the time of registration.",
        "Everyone should report at least 30 mins before scheduled match time.",
        "Each team should consist of 15 members.",
        "Out of these, 11 members will play in the match.",
        "The game will be played with a red ball.",
        "Teams must bring their own kit bags.",
        "Players should wear proper white attire.",
        "All other rules will follow the standard BCCI guidelines.",
        "If the player would like to raise an issue or concern either before or during the event, he / she must approach the protest team."
      ],
      prizes: {
        first: "Rs. 5,000",
        second: "Rs. 4,000"
      },
      contacts: [
        { name: "Mr. U. Om Shri", phone: "+91 93477 75310" },
        { name: "Mr. G. Siva Rama Krishna", phone: "+91 63099 59419" }
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
        { name: "Ms. P. Sangeetha", phone: "+91 78427 35151" },
        { name: "Ms. U. Mounika", phone: "+91 96181 09821" },
        { name: "Mr. N. Shivaji", phone: "+91 83090 65560" },
        { name: "Mr. U. Rahul", phone: "+91 79812 31262" },
        { name: "Mr. Anil", phone: "+91 83093 78066" },
        { name: "Mr. Harsha sai", phone: "+91 88852 19568" },
        { name: "Mr. Y. Raghu Ram", phone: "+91 99898 84558" }
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
       { name: "Ms. P. Sangeetha", phone: "+91 78427 35151" },
        { name: "Ms. U. Mounika", phone: "+91 96181 09821" },
        { name: "Mr. N. Shivaji", phone: "+91 83090 65560" },
        { name: "Mr. U. Rahul", phone: "+91 79812 31262" },
        { name: "Mr. Anil", phone: "+91 83093 78066" },
        { name: "Mr. Harsha sai", phone: "+91 88852 19568" },
        { name: "Mr. Y. Raghu Ram", phone: "+91 99898 84558" }
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
        first: "Rs. 15,000",
        second: "Rs. 10,000"
      },
      contacts: [
       { name: "Ms. P. Sangeetha", phone: "+91 78427 35151" },
        { name: "Ms. U. Mounika", phone: "+91 96181 09821" },
        { name: "Mr. N. Shivaji", phone: "+91 83090 65560" },
        { name: "Mr. U. Rahul", phone: "+91 79812 31262" },
        { name: "Mr. Anil", phone: "+91 83093 78066" },
        { name: "Mr. Harsha sai", phone: "+91 88852 19568" },
        { name: "Mr. Y. Raghu Ram", phone: "+91 99898 84558" }
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
        { name: "Ms. P. Sangeetha", phone: "+91 78427 35151" },
        { name: "Ms. U. Mounika", phone: "+91 96181 09821" },
        { name: "Mr. N. Shivaji", phone: "+91 83090 65560" },
        { name: "Mr. U. Rahul", phone: "+91 79812 31262" },
        { name: "Mr. Anil", phone: "+91 83093 78066" },
        { name: "Mr. Harsha sai", phone: "+91 88852 19568" },
        { name: "Mr. Y. Raghu Ram", phone: "+91 99898 84558" }
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
        first: "Rs. 15,000",
        second: "Rs. 10,000"
      },
      contacts: [
        { name: "Ms. P. Sangeetha", phone: "+91 78427 35151" },
        { name: "Ms. U. Mounika", phone: "+91 96181 09821" },
        { name: "Mr. N. Shivaji", phone: "+91 83090 65560" },
        { name: "Mr. U. Rahul", phone: "+91 79812 31262" },
        { name: "Mr. Anil", phone: "+91 83093 78066" },
        { name: "Mr. Harsha sai", phone: "+91 88852 19568" },
        { name: "Mr. Y. Raghu Ram", phone: "+91 99898 84558" }
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
      contacts: 
      [
        { name: "Ms. P. Sangeetha", phone: "+91 78427 35151" },
        { name: "Ms. U. Mounika", phone: "+91 96181 09821" },
        { name: "Mr. N. Shivaji", phone: "+91 83090 65560" },
        { name: "Mr. U. Rahul", phone: "+91 79812 31262" },
        { name: "Mr. Anil", phone: "+91 83093 78066" },
        { name: "Mr. Harsha sai", phone: "+91 88852 19568" },
        { name: "Mr. Y. Raghu Ram", phone: "+91 99898 84558" }
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
        second: "Rs. 20,000"
      },
      contacts: [
       { name: "Ms. P. Sangeetha", phone: "+91 78427 35151" },
        { name: "Ms. U. Mounika", phone: "+91 96181 09821" },
        { name: "Mr. N. Shivaji", phone: "+91 83090 65560" },
        { name: "Mr. U. Rahul", phone: "+91 79812 31262" },
        { name: "Mr. Anil", phone: "+91 83093 78066" },
        { name: "Mr. Harsha sai", phone: "+91 88852 19568" },
        { name: "Mr. Y. Raghu Ram", phone: "+91 99898 84558" }
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
        { name: "Ms. P. Sangeetha", phone: "+91 78427 35151" },
        { name: "Ms. U. Mounika", phone: "+91 96181 09821" },
        { name: "Mr. N. Shivaji", phone: "+91 83090 65560" },
        { name: "Mr. U. Rahul", phone: "+91 79812 31262" },
        { name: "Mr. Anil", phone: "+91 83093 78066" },
        { name: "Mr. Harsha sai", phone: "+91 88852 19568" },
        { name: "Mr. Y. Raghu Ram", phone: "+91 99898 84558" }
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
        first: "Rs. 15,000",
        second: "Rs. 10,000"
      },
      contacts: [
        { name: "Ms. P. Sangeetha", phone: "+91 78427 35151" },
        { name: "Ms. U. Mounika", phone: "+91 96181 09821" },
        { name: "Mr. N. Shivaji", phone: "+91 83090 65560" },
        { name: "Mr. U. Rahul", phone: "+91 79812 31262" },
        { name: "Mr. Anil", phone: "+91 83093 78066" },
        { name: "Mr. Harsha sai", phone: "+91 88852 19568" },
        { name: "Mr. Y. Raghu Ram", phone: "+91 99898 84558" }
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
       { name: "Ms. P. Sangeetha", phone: "+91 78427 35151" },
        { name: "Ms. U. Mounika", phone: "+91 96181 09821" },
        { name: "Mr. N. Shivaji", phone: "+91 83090 65560" },
        { name: "Mr. U. Rahul", phone: "+91 79812 31262" },
        { name: "Mr. Anil", phone: "+91 83093 78066" },
        { name: "Mr. Harsha sai", phone: "+91 88852 19568" },
        { name: "Mr. Y. Raghu Ram", phone: "+91 99898 84558" }
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
        { name: "Ms. P. Sangeetha", phone: "+91 78427 35151" },
        { name: "Ms. U. Mounika", phone: "+91 96181 09821" },
        { name: "Mr. N. Shivaji", phone: "+91 83090 65560" },
        { name: "Mr. U. Rahul", phone: "+91 79812 31262" },
        { name: "Mr. Anil", phone: "+91 83093 78066" },
        { name: "Mr. Harsha sai", phone: "+91 88852 19568" },
        { name: "Mr. Y. Raghu Ram", phone: "+91 99898 84558" }
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
        { name: "Ms. P. Sangeetha", phone: "+91 78427 35151" },
        { name: "Ms. U. Mounika", phone: "+91 96181 09821" },
        { name: "Mr. N. Shivaji", phone: "+91 83090 65560" },
        { name: "Mr. U. Rahul", phone: "+91 79812 31262" },
        { name: "Mr. Anil", phone: "+91 83093 78066" },
        { name: "Mr. Harsha sai", phone: "+91 88852 19568" },
        { name: "Mr. Y. Raghu Ram", phone: "+91 99898 84558" }
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
        { name: "Ms. P. Sangeetha", phone: "+91 78427 35151" },
        { name: "Ms. U. Mounika", phone: "+91 96181 09821" },
        { name: "Mr. N. Shivaji", phone: "+91 83090 65560" },
        { name: "Mr. U. Rahul", phone: "+91 79812 31262" },
        { name: "Mr. Anil", phone: "+91 83093 78066" },
        { name: "Mr. Harsha sai", phone: "+91 88852 19568" },
        { name: "Mr. Y. Raghu Ram", phone: "+91 99898 84558" }
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
      contacts: [
         {name: "Ms. Ch. Aparna", phone: "+91 8523 81322"},
        {name: "Mr. B. Ram Chandu", phone: "+91 83412 40966"},
        {name: "Ms. Asritha", phone: "+91 73868 89772"},
        {name: "Mr. Vineesha", phone: "+91 99516 95475"}
      ]
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
      contacts: [
        {name: "Ms. K.lakshmi Revathi", phone: "+91 97035 55544"},
        {name: "Mr. M.Winstone", phone: "+91 83280 09698"},
        {name: "Ms. Varshitha", phone: "+91 87123 47513"}
      ]
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
      contacts: [
        {name: "Ms. Ch. Aparna", phone: "+91 8523 81322"},
        {name: "Mr. B. Ram Chandu", phone: "+91 83412 40966"},
        {name: "Ms. Asritha", phone: "+91 73868 89772"},
        {name: "Mr. Vineesha", phone: "+91 99516 95475"}
      ]
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
      contacts: [
         {name: "Ms. K.lakshmi Revathi", phone: "+91 97035 55544"},
        {name: "Mr. M.Winstone", phone: "+91 83280 09698"},
        {name: "Ms. Varshitha", phone: "+91 87123 47513"}
      ]
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
      contacts: [
        {name: "Ms. K.lakshmi Revathi", phone: "+91 97035 55544"},
        {name: "Mr. M.Winstone", phone: "+91 83280 09698"},
        {name: "Ms. Varshitha", phone: "+91 87123 47513"}
      ]
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
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
         {name: "Ms. K.lakshmi Revathi", phone: "+91 97035 55544"},
        {name: "Mr. M.Winstone", phone: "+91 83280 09698"},
        {name: "Ms. Varshitha", phone: "+91 87123 47513"}
      ]
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
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
         {name: "Ms. K.lakshmi Revathi", phone: "+91 97035 55544"},
        {name: "Mr. M.Winstone", phone: "+91 83280 09698"},
        {name: "Ms. Varshitha", phone: "+91 87123 47513"}
      ]
    },
    "Anthyakshari Duo": {
      title: "MUSIC",
      subtitle: "Anthyakshari Duo",
      rules: [
        "The event will be having 3 - 4 rounds.",
        "First round will be written test on the questions about movie songs and personalities.",
        "The details of remaining rounds will be announced on spot"
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
         {name: "Ms. K.lakshmi Revathi", phone: "+91 97035 55544"},
        {name: "Mr. M.Winstone", phone: "+91 83280 09698"},
        {name: "Ms. Varshitha", phone: "+91 87123 47513"}
      ]
    },
    "Instrumental Solo": {
      title: "MUSIC",
      subtitle: "Instrumental Solo",
      rules: [
        "This category is open to all types of instruments, including Western or Classical, and Percussion or Non-Percussion.",
        "No pre-processed or programmed sounds/loops are allowed in the performance.",
        "Item can be presented in any style or genre.",
        "Participants must bring their own instruments.",
        "Duration of performance shall be between 4 to 5 min.",
        "Time for stage/ Instruments setting is maximum 3 minutes.",
        "Maximum number of accompanists is two. (if required)",
        "Judges may ask for specific changes in the performance and request a subsequent performance if deemed necessary.",
        "Judging will be based on the following criteria:",
        "Mastery of the instrument and proficiency.",
        "Complexity and difficulty of the piece/Music performed.",
        "Musicality, expression, and dynamics.",
        "Composition and overall impression.",
        "Adaptability to on-the-spot changes as directed by judges."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
         {name: "Ms. K.lakshmi Revathi", phone: "+91 97035 55544"},
        {name: "Mr. M.Winstone", phone: "+91 83280 09698"},
        {name: "Ms. Varshitha", phone: "+91 87123 47513"}
      ]
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
      contacts: [
        {name: "Ms. K.Pavankishore", phone: "+91 99633 17059"},
        {name: "Mr. P.Samba Siva Rao", phone: "+91 63011 24757"}
      ]
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
      contacts: [
        {name: "Ms. K.Pavankishore", phone: "+91 99633 17059"},
        {name: "Mr. P.Samba Siva Rao", phone: "+91 63011 24757"}
      ]
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
      contacts: [
         {name: "Ms. Ch.Aparna", phone: "+91 8523 81322"},
        {name: "Mr. B.Ram Chandu", phone: "+91 83412 40966"},
        {name: "Ms. Asritha", phone: "+91 73868 89772"},
        {name: "Mr. Vineesha", phone: "+91 99516 95475"}
      ]
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
        third: "Rs. 1,500"
      },
      contacts: [
         {name: "Ms. Ch.Aparna", phone: "+91 8523 81322"},
        {name: "Mr. B.Ram Chandu", phone: "+91 83412 40966"},
        {name: "Ms. Asritha", phone: "+91 73868 89772"},
        {name: "Mr. Vineesha", phone: "+91 99516 95475"}
      ]
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
      contacts: [
         {name: "Ms. Ch.Aparna", phone: "+91 8523 81322"},
        {name: "Mr. B.Ram Chandu", phone: "+91 83412 40966"},
        {name: "Ms. Asritha", phone: "+91 73868 89772"},
        {name: "Mr. Vineesha", phone: "+91 99516 95475"}
      ]
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
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
         {name: "Ms. K.Pavankishore", phone: "+91 9963317059"},
        {name: "Mr. P.Samba Siva Rao", phone: "+91 63011 24757"}
      ]
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
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
         {name: "Ms. K.Pavankishore", phone: "+91 99633 17059"},
        {name: "Mr. P.Samba Siva Rao", phone: "+91 63011 24757"}
      ]
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
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
         {name: "Ms. K.Pavankishore", phone: "+91 9963317059"},
        {name: "Mr. P.Samba Siva Rao", phone: "+91 63011 24757"}
      ]
    },
    "Master Orator": {
      title: "LITERATURE",
      subtitle: "Master Orator",
      rules: [
        "Speaking Time: Each participant will be given 3 minutes for delivering content.",
        "First Round Topic: The topic for the first round will be provided one day before the competition and will be sent to the participants' respective emails.",
        "Second Round (Extempore): The second round will be Extempore. The topic will be given on the spot and participants will have 25 seconds as buffer time for preparation.",
        "Judgment will be based on the following: Content delivery, fluency, and relevance to the topic given.",
        "The winner will be awarded the title of \"Master Orator\"."
      ],
      prizes: {
        first: "Rs. 4,000",
        second: "Rs. 3,000",
        third: "Rs. 2,000"
      },
      contacts: [
        {name: "Mr. Nihal Kumar", phone: "+91 79797 52014"},
        {name: "Ms. N.S.N.B. Nihari", phone: "+91 79957 98055"},
        {name: "Ms. D. Kavya Sucharitha ", phone: "+91 89194 15146"},
        {name: "Mr. Gouse Baji Shaik", phone: "+91 81433 83228"}
      ]
    },
    "On Spot Creative Content Writing": {
      title: "LITERATURE",
      subtitle: "Spot Creative Writing",
      rules: [
        "1. Creative writing is defined as any writing of the participant's own composition.",
        "2. Participants are required to write an essay on a particular topic that will be given on the spot.",
        "3. The written submissions are to be submitted within the specified duration.",
        "4. The word limit for the competition is 800 words."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
        {name: "Mr. Nihal Kumar", phone: "+91 79797 52014"},
        {name: "Ms. N.S.N.B. Nihari", phone: "+91 79957 98055"},
        {name: "Ms. D. Kavya Sucharitha ", phone: "+91 89194 15146"},
        {name: "Mr. Gouse Baji Shaik", phone: "+91 81433 83228"}
      ]
    },
    "Telugu Vyaasa Rachana": {
      title: "LITERATURE",
      subtitle: "Telugu Vyaasa Rachana",
      rules: [
        "Telugu Vyaasa Rachana is defined as any writing of the participant's own composition.",
        "Participants are required to write an essay in Telugu on a particular topic that will be given on the spot.",
        "The written submissions are to be submitted within the specified duration."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
        {name: "Mr. Nihal Kumar", phone: "+91 79797 52014"},
        {name: "Ms. N.S.N.B. Nihari", phone: "+91 79957 98055"},
        {name: "Ms. D. Kavya Sucharitha ", phone: "+91 89194 15146"},
        {name: "Mr. Gouse Baji Shaik", phone: "+91 81433 83228"}
      ]
    },
    "Shayari - Hindi": {
      title: "LITERATURE",
      subtitle: "Shayari - Hindi",
      rules: [
        "Participants should present their own composed Shayari on one of the following themes: “PATRIOTISM / LOVE / FORGIVING”.",
        "Participants are supposed to re-write the Shayari composed by them on the selected topic on the spot without seeing and a hard copy of the Shayari shall be submitted to the judges.",
        "The Shayari must be performed on the stage.",
        "The minimum number of lines should be 6 to 8.",
        "Each participant should submit only one entry.",
        "The judgment criteria would be based on the Impact, Creativity, Relevance to the theme."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
        {name: "Mr. Nihal Kumar", phone: "+91 79797 52014"},
        {name: "Ms. N.S.N.B. Nihari", phone: "+91 79957 98055"},
        {name: "Ms. D. Kavya Sucharitha ", phone: "+91 89194 15146"},
        {name: "Mr. Gouse Baji Shaik", phone: "+91 81433 83228"}
      ]
    },
    "JAM": {
      title: "Rules",
      subtitle: "LITERATURE",
      rules: [
        "This competition is designed for those who enjoy speaking impromptu.",
        "After the topic is given, 25 seconds will be provided as buffer time.",
        "Following the buffer time, the participant must talk for a maximum of one minute regarding the given topic.",
        "",
        "Game play and Scoring:",
        "The game proceeds in rounds with contestants attempting to interrupt the speaker by correctly identifying errors.",
        "Action",
        "Points Awarded",
        "Successful Jam (Justified Interruption)",
        "+5 Points to the interrupter (who then takes over as speaker).",
        "Unsuccessful Jam (Unjustified Interruption)",
        "-2 Points to the interrupter.",
        "Speaking Successfully (Until Jammed or Time-Out)",
        "+1 Point for every 10 seconds of error-free speech (to be tracked by the timekeeper).",
        "",
        "One of the contestants will begin speaking on the given topic.",
        "Any other contestant can 'jam' (interrupt) the speaker by stating the reason for the interruption.",
        "If the reason for jamming is justified, the interrupting person will gain points and the chance to speak.",
        "If the reason for jamming is turned down, the interrupting person will receive negative points, and the previous speaker can continue speaking.",
        "The contestant with the maximum points at the end of the given time will be declared the winner.",
        "",
        "Judicial Clarification: Valid Jamming Reasons",
        "For the purpose of consistency, justified interruptions (successful jams) may be called for the following reasons, among others:",
        "Hesitation/Stammering (a prolonged pause or repetition).",
        "Repetition (of a word or phrase, excluding articles/prepositions).",
        "Grammatical Error (a clear error in syntax or grammar).",
        "Deviation from the Topic (a complete shift away from the theme).",
        "Failure to use a specific word/phrase (if mandated by the topic card)."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
        {name: "Mr. Nihal Kumar", phone: "+91 79797 52014"},
        {name: "Ms. N.S.N.B. Nihari", phone: "+91 79957 98055"},
        {name: "Ms. D. Kavya Sucharitha ", phone: "+91 89194 15146"},
        {name: "Mr. Gouse Baji Shaik", phone: "+91 81433 83228"}
      ]
    },
    "Dumb Charades": {
      title: "LITERATURE",
      subtitle: "Dumb Charades",
      rules: [
        "Team Composition and Time Limits",
        "Participation is strictly limited to teams of two (2) members.",
        "The maximum time allotted for a team to successfully enact and guess one word/phrase is 90 seconds (1 minute 30 seconds).",
        "The competition will consist of multiple rounds. Each team will attempt to guess a predetermined number of clues (e.g., 5 clues) per turn.",
        "Gameplay",
        "Word/Phrase Cards: Teams will be provided with clue cards containing a word, phrase, or movie title (in any language).",
        "Roles: One member of the team will act out the clue (The Enactor), and the other member will guess the clue (The Guesser).",
        "Non-Verbal Rule: The Enactor must perform the charade using only gestures, body movements, and facial expressions. No lip movements, pointing to written words, or sounds are allowed. Any violation of this rule will result in the immediate cancellation of the current clue and a penalty.",
        "Passing: Teams are permitted to pass on a clue if they are unable to guess it within a reasonable time. The team may only return to a passed clue if they complete all others within the 90-second limit.",
        "Scoring and Judging",
        "Scoring: Points will be awarded for each successfully guessed clue.",
        "3 Points for each correctly guessed movie/phrase.",
        "Penalty: -2 Points will be deducted for any infringement of the non-verbal rule (lip movement, sound).",
        "Winning: The team with the highest total score after all rounds will be declared the winner. In case of a tie, a sudden death round will be conducted.",
        "Conduct",
        "Electronic Devices: The use of any electronic device, including mobile phones, to search for clues or assist in guessing is strictly prohibited and will result in disqualification.",
        "Audience Assistance: Audience members are not allowed to prompt, shout, or assist the guessing team. Any deliberate attempt to assist will be penalized at the judge's discretion.",
        "Judge's Decision: The decision of the Judge/Coordinator on the validity of the guess and any rule violations is final.",
        "Cash Prizes:",
        "First - Rs. 2000",
        "Second - Rs. 1500",
        "Third - Rs. 1000",
        "Contact no:"
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
        {name: "Mr. Nihal Kumar", phone: "+91 79797 52014"},
        {name: "Ms. N.S.N.B. Nihari", phone: "+91 79957 98055"},
        {name: "Ms. D. Kavya Sucharitha ", phone: "+91 89194 15146"},
        {name: "Mr. Gouse Baji Shaik", phone: "+91 81433 83228"}
      ]
    },

    "Quiz": {
      title: "LITERATURE",
      subtitle: "Quiz Wiz",
      rules: [
        "This competition is designed to test participants' knowledge across a wide spectrum of subjects.",
        "I. Registration and Team Composition",
        "Team Size: Participation is strictly limited to teams of three (3) members.",
        "Team Formation: Teams are permitted regardless of college affiliation. However, all participants must be registered students.",
        "Conduct: Any attempt by a team to disrupt or \"mess the atmosphere\" of the contest through unfair means or unsportsmanlike conduct will result in immediate disqualification.",
        "II. Event Structure and Rounds",
        "The competition will consist of a maximum of three rounds. The Quizmaster reserves the right to modify the number or type of rounds based on the number of participating teams.",
        "Round 1: This will be a written round containing questions covering various topics.",
        "Round 2: Knowledge Dropping (Mechanism to be Defined by Quizmaster): This will be a multi-answer or visual round where points may be awarded for each correct piece of information provided, testing deep knowledge in a specific area.",
        "Round 3: Speeding Test (Buzzer Round): This is a rapid-fire round where the fastest correct answer wins points.",
        "III. General Rules of Conduct",
        "Electronic Devices: The use of any electronic gadgets, including but not limited to mobile phones, laptops, smartwatches, or any external material (printed or digital) is strictly prohibited. Violation will result in immediate disqualification of the entire team.",
        "Stationery: All necessary stationery (pens, paper) will be provided by the organizers. Participants are not allowed to bring any loose paper, personal pens, or external writing material into the competition area.",
        "Subject Areas: Questions will cover History, Mythology, Literature, Social Sciences, General World Affairs, and current events.",
        "Discipline: Arguments or aggressive disputes with the contestants, the Quizmaster, or the coordinators over questions or answers are strictly prohibited and will lead to the immediate elimination of the offending team.",
        "Quizmaster's Decision: The decision of the Quizmaster on all matters, including questions, answers, and scoring, is final and binding.",
        "IV. Scoring and Tie-Breaker (Essential additions)",
        "Scoring System: (To be announced before the start of Round 1). Points will be allocated for correct answers, and negative marking may be applied for incorrect answers in the buzzer rounds.",
        "Tie-Breaker: In the event of a tie for the top position, a sudden death question or a separate tie-breaker round will be conducted to determine the winner.",
        "Cash Prizes:",
        "First - Rs. 3000",
        "Second - Rs. 2000",
        "Third - Rs. 1500"
      ],
      prizes: {
        first: "Rs. 3,000",
        second: "Rs. 2,000",
        third: "Rs. 1,500"
      },
      contacts: [
        {name: "Mr. Nihal Kumar", phone: "+91 79797 52014"},
        {name: "Ms. N.S.N.B. Nihari", phone: "+91 79957 98055"},
        {name: "Ms. D. Kavya Sucharitha ", phone: "+91 89194 15146"},
        {name: "Mr. Gouse Baji Shaik", phone: "+91 81433 83228"}
      ]
    },

    "Word Master": {
      title: "LITERATURE",
      subtitle: "Word Master",
      rules: [
        "This multi-stage event tests participants' comprehensive command of vocabulary, spelling, and analytical word skills.",
        "I. Event Structure and Flow",
        "The competition is a series of elimination rounds, consisting of four distinct events:",
        "Round 1: Words Worth — Vocabulary / Word Knowledge",
        "Round 2: Spell Bee — Spelling Accuracy",
        "Round 3: Solving Crosswords — Word Definition / Grid Solving",
        "Round 4 (Finals): Solving Anagrams — Analytical Word Rearrangement",
        "II. General Rules and Timing",
        "Format: This is an individual competition.",
        "Timing: The specific time limits for Solving Anagrams and Solving Crosswords will be announced on the spot by the coordinator.",
        "Progression: Contestants will be filtered based on performance in each preceding round to advance to the next stage.",
        "Device Usage: The use of any electronic device, mobile phone, or external reference material is strictly prohibited and will result in immediate disqualification.",
        "Scoring criteria: Scoring will be based on accuracy and time taken to complete the task",
        "Cash Prizes:",
        "First - Rs. 2000",
        "Second - Rs. 1500",
        "Third - Rs. 1000",
        "Contact no:"
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
        {name: "Mr. Nihal Kumar", phone: "+91 79797 52014"},
        {name: "Ms. N.S.N.B. Nihari", phone: "+91 79957 98055"},
        {name: "Ms. D. Kavya Sucharitha ", phone: "+91 89194 15146"},
        {name: "Mr. Gouse Baji Shaik", phone: "+91 81433 83228"}
      ]
    },

    "Story telling": {
      title: "LITERATURE",
      subtitle: "Story Telling",
      rules: [
        "This competition provides a platform to explore the ancient art of storytelling and captivate the audience through powerful oratory skills.",
        "Performance Details:",
        "Time Limit: The maximum duration for the performance is 6 minutes. A warning bell will sound at 5 minutes, and the final bell will sound at 6 minutes, at which point the participant must conclude their story.",
        "Language: The performance may be delivered in English or Telugu.",
        "Theme/Genre: The participant is free to choose any theme or genre (e.g., Folk Tale, Personal Narrative, Historical, Fiction, etc.).",
        "Aids and Props: The use of simple, hand-held props is permitted, but elaborate sets or background music/audio tracks are not allowed.",
        "Content and Originality:",
        "Source Material: The story presented may be original (composed by the participant) or adapted from an existing published work. If adapted, the source must be verbally acknowledged at the start or end of the performance.",
        "Content Restriction: The story must be suitable for a general audience. Vulgarity, offensive insinuations, or content that promotes hate speech or discrimination is strictly prohibited.",
        "Judging Criteria:",
        "The performance will be evaluated on the qualities like Narrative Arc and Content, Vocal Modulation, Expression and Gestures, Audience Engagement and adherence to Time Limit."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
        {name: "Mr. Nihal Kumar", phone: "+91 79797 52014"},
        {name: "Ms. N.S.N.B. Nihari", phone: "+91 79957 98055"},
        {name: "Ms. D. Kavya Sucharitha ", phone: "+91 89194 15146"},
        {name: "Mr. Gouse Baji Shaik", phone: "+91 81433 83228"}
      ]
    },

    "Theme Painting": {
      title: "VISUAL ARTS",
      subtitle: "On Spot Theme Painting",
      rules: [
        "The theme for the painting will be given to the participants on the spot.",
        "The maximum time for the participant in completing the painting shall not exceed 2 hours and 30 minutes.",
        "Painting should be done on the A3 size drawing paper provided by the organisers.",
        "Participants are permitted to use any medium, including pencil colors, oil colors, watercolors, poster colors, or pastel colors.",
        "Candidates are responsible for bringing their own materials, such as brushes, paints, palettes, etc. Only the A3 drawing paper will be provided by the organizers.",
        "Participants may be required to provide a verbal description or explanation of their painting to the judges, if deemed necessary by the judging panel.",
        "The use of any mobile phones, internet, or other electronic devices is strictly prohibited during the competition."
      ],
      prizes: {
        first: "Rs. 4,000",
        second: "Rs. 3,000",
        third: "Rs. 2,000"
      },
      contacts: [
        {name: "Ms. K.Unnathi", phone: "+91 79815 97629"},
        {name: "Mr. Ch.Dhanush", phone: "+91 63014 20067"},
        {name: "Ms. P.Lavanya ", phone: "+91 93819 88110"}
      ]
    },

    "Clay Modelling": {
      title: "VISUAL ARTS",
      subtitle: "Clay Modelling",
      rules: [
        "The specific theme for the clay model will be given to the participants on the spot.",
        "The maximum time allocated for the competition shall not exceed 2 hours and 30 minutes.",
        "The necessary clay material will be provided to all participants by the organizers.",
        "Specific details regarding the required size, additional topic clarification, and any other specific rules will be announced on the spot at the start of the competition.",
        "Participants must bring their own modelling tools (e.g., sculpting tools, wires, knives).",
        "Judgement will be based on Creativity & Interpretation of the theme, technique & finish, three dimensionality & form.",
        "The use of any mobile phones, internet, or external reference images/materials is strictly prohibited."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
        {name: "Ms. K.Unnathi", phone: "+91 79815 97629"},
        {name: "Mr. Ch.Dhanush", phone: "+91 63014 20067"},
        {name: "Ms. P.Lavanya ", phone: "+91 93819 88110"}
      ]
    },

    "Rangoli": {
      title: "VISUAL ARTS",
      subtitle: "Rangoli",
      rules: [
        "A team may consist of a maximum of two (2) members.",
        "The maximum time allocated for the competition shall not exceed 2 hours and 30 minutes.",
        "Participants are responsible for bringing all their own materials.",
        "Only one medium is permitted for the design. The allowed mediums are: Colours, Flower Petals or Saw – dust or Pulses or Rice.",
        "The medium and form of expression can be free-hand, pictorial, or descriptive.",
        "Participants must prepare their Rangoli design within the space provided by the organizers.",
        "The use of any mobile phones or internet for reference or assistance is strictly prohibited during the competition.",
        "Judgement will be based on overall impact and visual appeal, creativity and interpretation of theme (if a theme is announced), clarity, symmetry and detailing, aesthetic use of chosen medium."
      ],
      prizes: {
        first: "Rs. 3,000",
        second: "Rs. 2,000",
        third: "Rs. 1,000"
      },
      contacts: [
        {name: "Ms. K.Unnathi", phone: "+91 79815 97629"},
        {name: "Mr. Ch.Dhanush", phone: "+91 63014 20067"},
        {name: "Ms. P.Lavanya ", phone: "+91 93819 88110"}
      ]
    },

    "Mehandi": {
      title: "FINE ARTS",
      subtitle: "Mehandi (Henna Art)",
      rules: [
        "The due credit will be given on originality, creativity, decorative art with aesthetic sense.",
        "Use of hand print, any kind of Mold and any kind of decorative material is not allowed.",
        "Participants have to bring their own Mehandi and other materials required for it.",
        "Duration will not be more than 2 hours 30 minutes.",
        "The Mehandi must be extended to the palmer side forearm with minimum 6 inch length of both hands of the model.",
        "Any kind of mobile or internet usage will be prohibited."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
        {name: "Ms. K.Unnathi", phone: "+91 79815 97629"},
        {name: "Mr. Ch.Dhanush", phone: "+91 63014 20067"},
        {name: "Ms. P.Lavanya ", phone: "+91 93819 88110"}
      ]
    },

    "Collage": {
      title: "FINE ARTS",
      subtitle: "Collage",
      rules: [
        "Theme will be given on the spot on the given topic, sheet size A3.",
        "Duration will not be more than 2 hours 30 minutes.",
        "Participants shall bring their own scissors, pasting and other material required for contest.",
        "Collage has to be prepared from old magazines brought by the participants.",
        "Any kind of mobile or internet usage will be prohibited.",
        "Judgement will be based on creativity, theme interpretation, arrangement, and overall presentation."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
        {name: "Ms. K.Unnathi", phone: "+91 79815 97629"},
        {name: "Mr. Ch.Dhanush", phone: "+91 63014 20067"},
        {name: "Ms. P.Lavanya ", phone: "+91 93819 88110"}
      ]
    },

    "Face Painting": {
      title: "FINE ARTS",
      subtitle: "Face Painting",
      rules: [
        "The participants can paint on the face of the model with a theme of their own choice.",
        "Duration will not be more than 2 hours 30 minutes.",
        "The due credit will be given on originality, creativity, decorative art with aesthetic sense.",
        "Any kind of mobile or internet usage will be prohibited."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
        {name: "Ms. K.Unnathi", phone: "+91 79815 97629"},
        {name: "Mr. Ch.Dhanush", phone: "+91 63014 20067"},
        {name: "Ms. P.Lavanya ", phone: "+91 93819 88110"}
      ]
    },

    "Pencil Sketching": {
      title: "FINE ARTS",
      subtitle: "Pencil Sketching",
      rules: [
        "Theme will be declared on the spot.",
        "Participants should bring their own materials needed for drawing like pencil, eraser, etc. Only drawing sheet will be provided.",
        "Size of the painting will be A3 size drawing paper.",
        "Duration will not be more than 2 hour 30 min.",
        "Usage of mobile will be prohibited.",
        "Judgement will be decided on the creativity, technique and proper usage of theme."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
        {name: "Ms. K.Unnathi", phone: "+91 79815 97629"},
        {name: "Mr. Ch.Dhanush", phone: "+91 63014 20067"},
        {name: "Ms. P.Lavanya ", phone: "+91 93819 88110"}
      ]
    },

    "Mandala Art": {
      title: "FINE ARTS",
      subtitle: "Mandala Art",
      rules: [
        "Theme will be given on spot.",
        "Participants must adhere to the given theme or create original, thematic mandalas if open-ended.",
        "A3 sheet will be given.",
        "All artwork must be original; Any kind of mobile or internet usage will be prohibited.",
        "Entries are judged based on creativity, technique, adherence to theme, and visual appeal."
      ],
      prizes: {
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
        {name: "Ms. K.Unnathi", phone: "+91 79815 97629"},
        {name: "Mr. Ch.Dhanush", phone: "+91 63014 20067"},
        {name: "Ms. P.Lavanya ", phone: "+91 93819 88110"}
      ]
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
        {name: "Mr. S.Satya Reddy", phone: "+91 93900 41156"},
        {name: "Ms. Sara", phone: "+91 94904 84233"},
        {name: "Mr. Manohar ", phone: "+91 81253 97739"},
        {name: "Ms. Md.Nadira ", phone: "+91 93921 91983"},
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
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
         {name: "Mr. S.Satya Reddy", phone: "+91 93900 41156"},
        {name: "Ms. Sara", phone: "+91 94904 84233"},
        {name: "Mr. Manohar ", phone: "+91 81253 97739"},
        {name: "Ms. Md.Nadira ", phone: "+91 93921 91983"},
      ]
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
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
      },
      contacts: [
         {name: "Mr. S.Satya Reddy", phone: "+91 93900 41156"},
        {name: "Ms. Sara", phone: "+91 94904 84233"},
        {name: "Mr. Manohar ", phone: "+91 81253 97739"},
        {name: "Ms. Md.Nadira ", phone: "+91 93921 91983"},
      ]
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
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. ,000"
      },
      contacts: [
         {name: "Mr. S.Satya Reddy", phone: "+91 93900 41156"},
        {name: "Ms. Sara", phone: "+91 94904 84233"},
        {name: "Mr. Manohar ", phone: "+91 81253 97739"},
        {name: "Ms. Md.Nadira ", phone: "+91 93921 91983"},
      ]
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
        first: "Rs. 7,000",
        second: "Rs. 5,000",
        third: "Rs. 3,000"
      },
      contacts: [
         {name: "Mr. S.Satya Reddy", phone: "+91 93900 41156"},
        {name: "Ms. Sara", phone: "+91 94904 84233"},
        {name: "Mr. Manohar ", phone: "+91 81253 97739"},
        {name: "Ms. Md.Nadira ", phone: "+91 93921 91983"},
      ]
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
        first: "Rs. 4,000 (Mr. Mahotsav - Men)",
        second: "Rs. 4,000 (Ms. Mahotsav - Women)"
      },
      contacts: [
         {name: "Mr. S.Satya Reddy", phone: "+91 93900 41156"},
        {name: "Ms. Sara", phone: "+91 94904 84233"},
        {name: "Mr. Manohar ", phone: "+91 81253 97739"},
        {name: "Ms. Md.Nadira ", phone: "+91 93921 91983"},
      ]
    },
    "Online Photography": {
      title: "FINE ARTS",
      subtitle: "Online Photography",
      rules: [
        "Photograph should be taken using DSLR camera.",
        "Participant must provide RAW photo and EDITED photo , Minor editing is allowed.",
        "Participants must choose a theme from Nature/ Workman ship / Wild life / Street photography and submit 2 photographs of the chosen theme in prescribed format.",
        "Photograph must be in JPEG format only.",
        "Photograph size must be 1920x1080 pixels.",
        "Google and Stock images are not considerable."
      ],
      prizes: {
        first: "Rs. 4,000",
        second: "Rs. 3,000",
        third: "Rs. 2,000"
      },
      contacts: [
        {name: "Ms. K.Unnathi", phone: "+91 79815 97629"},
        {name: "Mr. Ch.Dhanush", phone: "+91 63014 20067"},
        {name: "Ms. P.Lavanya ", phone: "+91 93819 88110"}
      ]
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
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
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
        first: "Rs. 4,000",
        second: "Rs. 3,000",
        third: "Rs. 2,000"
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
        first: "Rs. 4,000",
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
        first: "Rs. 4,000",
        second: "Rs. 3,000",
        third: "Rs. 2,000"
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
        first: "Rs. 3,000",
        second: "Rs. 2,000",
        third: "Rs. 1,000"
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
        first: "Rs. 4,000",
        second: "Rs. 3,000",
        third: "Rs. 2,000"
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
        first: "Rs. 2,000",
        second: "Rs. 1,500",
        third: "Rs. 1,000"
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
        first: "Rs. 8,000",
        second: "Rs. 6,000",
        third: "Rs. 4,000"
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
        first: "Rs. 8,000",
        second: "Rs. 6,000",
        third: "Rs. 4,000"
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
        first: "Rs. 8,000",
        second: "Rs. 6,000",
        third: "Rs. 4,000"
      },
      contacts: []
    }
  };

  // Event image mapping
  const eventImageMap: { [key: string]: string } = {
    // Sports Events
    "Chess": "events/chess.avif",
    "Table Tennis": "events/Tabel Tennis.avif",
    "Traditional Yogasana": "events/Traditional Yoga.avif",
    "Artistic Yogasana": "events/Traditional Yoga.avif",
    "Taekwondo": "events/Taekwando.avif",
    "Tennikoit": "events/Tennikoit.avif",
    "Volley ball (Men)": "events/volley ball.avif",
    "Volley ball (Women)": "events/volley ball.avif",
    "Basket ball (Men)": "events/basket ball.avif",
    "Basket ball (Women)": "events/basket ball.avif",
    "Kabaddi (Men)": "events/kabbadi.avif",
    "Kabaddi (Women)": "events/kabbadi.avif",
    "Kho-Kho (Men)": "events/kho kho.avif",
    "Kho-Kho (Women)": "events/kho kho.avif",
    "Hockey (Men)": "events/hockey.avif",
    "Hockey (Women)": "events/hockey.avif",
    "Throw ball": "events/throwball.avif",
    "Football (Men)": "events/football men.avif",
    "Football (Women)": "events/football men.avif",
    // Dance Events
    "Classical Dance Solo": "events/classical dance.avif",
    "Dancing Star - Western Solo": "events/dancig star.avif",
    "Dancing Jodi - Western Duo": "events/dancing jodi.avif",
    "Spot Dance - Jodi": "events/spot dance.avif",
    "Group Dance": "events/group dance.avif",
    // Music Events
    "Singing Idol": "events/singing idol.avif",
    "Group Singing": "events/group singing.avif",
    "Singing Jodi": "events/singing jodi.avif",
    "Classical Light Vocal Solo": "events/classical or light vocal solo.avif",
    "Western Vocal Solo": "events/Western vocal solo.avif",
    "Anthyakshari Duo": "events/anthyakshari.avif",
    "Instrumental Solo": "events/instrumental solo.avif",
    // Theatre Events
    "Skit": "events/skit.avif",
    "Mime": "events/mime.avif",
    "Mono Action": "events/Mono Action.avif",
    "Spot Ad Making": "events/On Spot Ad Making.avif",
    "Dialogue Dhamaka": "events/Dialogue Drama.avif",
    // Literature Events
    "Master Orator": "events/Master orator.avif",
    "On Spot Creative Content Writing": "events/spot creative.avif",
    "Telugu Vyaasa Rachana": "events/telugu vyasa rachana.avif",
    "Shayari - Hindi": "events/Shayari hindi.avif",
    "JAM": "events/impromptu.avif",
    "Story telling": "events/story telling.avif",
    "Quiz": "events/Quiz wiz.avif",
    "Word Master": "events/word master.avif",
    "Dumb Charades": "events/dumb chardes.avif",
    // Visual Arts Events
    "Theme Painting": "events/Theme Painting.avif",
    "Clay Modelling": "events/clay modeling.avif",
    "Rangoli": "events/Rangoli.avif",
    "Mehandi": "events/Mehandi.avif",
    "Collage": "events/collage.avif",
    "Face Painting": "events/Face painting.avif",
    "Pencil Sketching": "events/pencil Sketching.avif",
    "Mandala Art": "events/Mandala Art.avif",
    // Fashion Design Events
    "Haute Couture": "events/Theme Ramp walk.avif",
    "Craftvilla": "events/Craft villa.avif",
    "Texart": "events/texart.avif",
    "T-Shirt Designing": "events/T-shirt designing.avif",
    // Digital Storytelling Events
    "Online Photography": "events/Theme Photography.avif",
    "Digital Poster Making": "events/Digital Poster Making.avif",
    "Mahotsav Digital Chronicle": "events/MH-26 Digital Chronicle.avif",
    "Reel Making": "events/reel making.avif",
    // Gaming Events
    "Valorant": "events/valorant.avif",
    "E-Football": "events/E-Football.avif",
    "Counter Strike": "events/Counter Strike.avif",
    "Smash Karts": "events/smash kart.avif"
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
        backgroundImage: 'url("https://res.cloudinary.com/dctuev0mm/image/upload/v1766935583/Background-redesign_jbvbrc.png")',
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
      backgroundImage: 'url("/Background-redesign.avif")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Flower - Top Right Corner */}
      <div className="fixed pointer-events-none z-[1] event-detail-flower" style={{
        top: '-150px',
        right: '-150px',
        width: '450px',
        height: '450px',
        opacity: 0.7
      }}>
        <FlowerComponent 
          size="100%"
          sunSize="50%"
          moonSize="43%"
          sunTop="25%"
          sunLeft="25%"
          moonTop="28.5%"
          moonLeft="28.5%"
          showPetalRotation={true}
        />
      </div>

      <div className="min-h-screen" style={{position: 'relative', zIndex: 10, padding: '0px'}}>
        {/* Header: Logo + Back Button + Title */}
        <div style={{margin: '0px', paddingTop: '0px', paddingLeft: '16px', paddingRight: '16px'}}>
          {/* Desktop layout */}
          <div className="hidden md:grid md:grid-cols-3 md:items-start mb-4">
            {/* Left column: Logo and Back button stacked */}
            <div className="flex flex-col items-start gap-3">
              <img 
                src={`${import.meta.env.BASE_URL}image.avif`}
                alt="Vignan Mahotsav" 
                style={{height: '18rem', objectFit: 'contain', marginTop: '-2rem'}}
              />
              <BackButton 
                className="!static !top-20 !left-auto" style={{marginTop: '-5rem',marginBottom: '8rem'}}
                onClick={handleBack}
              />
            </div>
            
            {/* Center column: Title */}
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '8px'}}>
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
          <div className="md:hidden flex flex-col items-center gap-3 mb-4 pt-0" style={{position: 'relative'}}>
            {/* Mahotsav Logo - Top Center */}
            <div className="event-detail-mobile-logo" style={{
              position: 'absolute',
              top: '0px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1,
              width: 'clamp(220px, 50vw, 350px) !important',
              maxWidth: 'clamp(220px, 50vw, 350px) !important',
              pointerEvents: 'none'
            }}>
              <img 
                src={`${import.meta.env.BASE_URL}image.avif`}
                alt="Vignan Mahotsav" 
                style={{
                  width: '100% !important',
                  height: 'auto',
                  display: 'block',
                  pointerEvents: 'none'
                }}
              />
            </div>
            
            {/* Back Button and Titles with padding-top for logo space */}
            <div style={{paddingTop: 'clamp(170px, 38vw, 240px)', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', position: 'relative', zIndex: 10}}>
              <div style={{width: '100%', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 10}}>
                <BackButton 
                  className="!static !top-auto !left-auto"
                  onClick={handleBack}
                  style={{cursor: 'pointer', pointerEvents: 'auto', position: 'relative', zIndex: 10}}
                />
              </div>
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
        </div>

        {/* Content Grid */}
        <div className="flex justify-center items-start">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] gap-3 sm:gap-4 max-w-7xl items-start px-4 sm:px-6 lg:px-0">
          {/* Poster */}
          <div className="flex justify-center lg:justify-start">
            <div className="w-48 h-64 sm:w-56 sm:h-72 md:w-64 md:h-80 bg-white/90 border-4 border-white rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
              {eventName && eventImageMap[eventName] ? (
                <img 
                  src={`${import.meta.env.BASE_URL}${eventImageMap[eventName]}`}
                  alt={eventName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-base sm:text-lg font-bold text-purple-900 text-center">
                  <span>POSTER of EVENT</span>
                </div>
              )}
            </div>
          </div>

          {/* Rules Section */}
          <div className="p-3 sm:p-4">
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-yellow-400" style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', fontFamily: 'Woodtrap, sans-serif'}}>
              Rules:
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {eventData.rules.map((rule, index) => (
                <li key={index} className="flex items-start gap-2 sm:gap-4">
                  <span className="text-yellow-400 font-bold text-base sm:text-lg mt-1 shrink-0">•</span>
                  <span className="text-white text-sm sm:text-base md:text-lg leading-relaxed sm:leading-loose" style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)', fontFamily: 'BakeryRoastDemo, sans-serif', letterSpacing: '0.02em'}}>
                    {rule}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Prizes and Contact Section */}
          <div className="space-y-3 sm:space-y-4">
            {/* Cash Prizes */}
            <div className="p-3 sm:p-4">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-yellow-400 text-center" style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', fontFamily: 'Woodtrap, sans-serif'}}>
                Cash Prizes:
              </h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 sm:gap-3 text-white text-sm sm:text-base">
                  <span className="font-bold text-yellow-400 min-w-[60px] sm:min-w-[80px]" style={{fontFamily: 'BakeryRoastDemo, sans-serif'}}>First</span>
                  <span className="font-semibold" style={{fontFamily: 'BakeryRoastDemo, sans-serif'}}>- {eventData.prizes.first}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-white text-sm sm:text-base">
                  <span className="font-bold text-yellow-400 min-w-[60px] sm:min-w-[80px]" style={{fontFamily: 'BakeryRoastDemo, sans-serif'}}>Second</span>
                  <span className="font-semibold" style={{fontFamily: 'BakeryRoastDemo, sans-serif'}}>- {eventData.prizes.second}</span>
                </div>
                {eventData.prizes.third && (
                  <div className="flex items-center gap-2 sm:gap-3 text-white text-sm sm:text-base">
                    <span className="font-bold text-yellow-400 min-w-[60px] sm:min-w-[80px]" style={{fontFamily: 'BakeryRoastDemo, sans-serif'}}>Third</span>
                    <span className="font-semibold" style={{fontFamily: 'BakeryRoastDemo, sans-serif'}}>- {eventData.prizes.third}</span>
                  </div>
                )}
                {eventData.prizes.fourth && (
                  <div className="flex items-center gap-2 sm:gap-3 text-white text-sm sm:text-base">
                    <span className="font-bold text-yellow-400 min-w-[60px] sm:min-w-[80px]" style={{fontFamily: 'BakeryRoastDemo, sans-serif'}}>Fourth</span>
                    <span className="font-semibold" style={{fontFamily: 'BakeryRoastDemo, sans-serif'}}>- {eventData.prizes.fourth}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="p-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-yellow-400 text-center" style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', fontFamily: 'Woodtrap, sans-serif'}}>
                Contact no:
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {eventData.contacts.map((contact, index) => {
                  // Determine prefix (Mr/Ms) based on name
                  const prefix = contact.name.toLowerCase().includes('ms') || contact.name.toLowerCase().includes('miss') ? 'Ms.' : 'Mr.';
                  // Clean name (remove existing Mr/Ms if present)
                  const cleanName = contact.name.replace(/^(Mr\.?|Ms\.?|Miss)\s*/i, '').trim();
                  // Format phone with +91 and space
                  const formattedPhone = contact.phone.startsWith('+91') ? contact.phone : `+91 ${contact.phone.replace(/^\+?91\s*/, '')}`;
                  
                  return (
                    <div key={index} className="text-white text-xs sm:text-sm md:text-base">
                      <div className="font-semibold" style={{fontFamily: 'BakeryRoastDemo, sans-serif'}}>
                        {prefix} {cleanName}: <a href={`tel:${formattedPhone.replace(/\s/g, '')}`} style={{color: '#FFD700', textDecoration: 'underline', cursor: 'pointer'}}>{formattedPhone}</a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-3 sm:gap-4 justify-center items-center mt-6 sm:mt-8 mb-6 sm:mb-8 px-4">
          <button 
            className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-xl transition-all duration-300 shadow-lg text-base sm:text-lg sm:min-w-[200px] disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
            onClick={handleDownloadPDF}
            disabled={isDownloading}
          >
            {isDownloading ? '⏳ Downloading...' : '📄 Download'}
          </button>
          
          <button 
            className="w-full sm:w-auto bg-pink-400 hover:bg-pink-500 text-white font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-xl transition-all duration-300 shadow-lg text-base sm:text-lg sm:min-w-[200px] touch-manipulation"
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
