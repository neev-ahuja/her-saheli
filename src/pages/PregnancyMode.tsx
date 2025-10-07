import React, { useState } from 'react';
import { Baby, BookOpen, Bell, Stethoscope, ArrowLeft, Calendar, Search, Plus, Trash2, Check, X } from 'lucide-react';

const PregnancyTracker = () => {
  const [currentView, setCurrentView] = useState('home');
  const [currentWeek, setCurrentWeek] = useState(12);
  const [reminders, setReminders] = useState([
    { id: 1, title: 'First Trimester Ultrasound', date: '2025-10-15', completed: false },
    { id: 2, title: 'Blood Test - Glucose Screening', date: '2025-11-02', completed: false },
  ]);
  const [newReminder, setNewReminder] = useState({ title: '', date: '' });
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [faqSearch, setFaqSearch] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');

  const weeklyGuide = {
    12: {
      babySize: "Plum",
      babyLength: "2.1 inches",
      babyWeight: "0.49 oz",
      developments: [
        "Baby's reflexes are developing - they can curl their toes and open and close fingers",
        "Fingernails and toenails are beginning to form",
        "The digestive system is practicing contractions",
        "Bone marrow is making white blood cells"
      ],
      motherChanges: [
        "Morning sickness may start to ease",
        "Energy levels might increase",
        "Your uterus is growing above your pelvis",
        "You may notice increased appetite"
      ],
      tips: [
        "Stay hydrated - aim for 8-10 glasses of water daily",
        "Continue taking prenatal vitamins",
        "Start thinking about maternity clothes",
        "Schedule your second prenatal visit"
      ]
    },
    20: {
      babySize: "Banana",
      babyLength: "6.5 inches",
      babyWeight: "10.58 oz",
      developments: [
        "You might feel baby's movements (quickening)",
        "Baby can hear sounds from outside",
        "Hair is growing on the head",
        "Baby's skin is developing protective layers"
      ],
      motherChanges: [
        "Your belly is clearly showing",
        "You may experience backaches",
        "Increased blood volume may cause nosebleeds",
        "Your center of gravity is shifting"
      ],
      tips: [
        "Sleep on your left side for better circulation",
        "Consider a pregnancy pillow for comfort",
        "Schedule your anatomy scan ultrasound",
        "Start pelvic floor exercises"
      ]
    },
    30: {
      babySize: "Cabbage",
      babyLength: "15.7 inches",
      babyWeight: "2.91 lbs",
      developments: [
        "Baby's brain is developing rapidly",
        "Eyes can open and close",
        "Bone marrow is producing red blood cells",
        "Baby is practicing breathing movements"
      ],
      motherChanges: [
        "You may feel short of breath",
        "Heartburn might increase",
        "Braxton Hicks contractions may begin",
        "You might notice swelling in feet and ankles"
      ],
      tips: [
        "Eat smaller, more frequent meals",
        "Elevate your feet when resting",
        "Practice relaxation techniques for labor",
        "Start thinking about your birth plan"
      ]
    }
  };

  const commonFaqs = [
    {
      question: "Is it normal to feel tired during pregnancy?",
      answer: "Yes, fatigue is very common, especially in the first and third trimesters. Your body is working hard to support your baby's growth. Rest when you can, maintain a balanced diet, and stay hydrated. Light exercise can also help boost energy levels."
    },
    {
      question: "What foods should I avoid during pregnancy?",
      answer: "Avoid raw or undercooked meat, fish with high mercury (like shark, swordfish), unpasteurized dairy products, raw eggs, and unwashed produce. Limit caffeine to 200mg per day. Always consult your healthcare provider for personalized advice."
    },
    {
      question: "How much weight should I gain during pregnancy?",
      answer: "Weight gain depends on your pre-pregnancy BMI. Generally: underweight (28-40 lbs), normal weight (25-35 lbs), overweight (15-25 lbs), obese (11-20 lbs). Your doctor will provide personalized guidance."
    },
    {
      question: "When will I feel my baby move?",
      answer: "First-time mothers typically feel movements between 18-25 weeks. If you've been pregnant before, you might feel movements as early as 16 weeks. These first movements feel like flutters or bubbles."
    },
    {
      question: "Can I exercise during pregnancy?",
      answer: "Yes! Moderate exercise is beneficial for most pregnancies. Good options include walking, swimming, prenatal yoga, and stationary cycling. Avoid contact sports and activities with fall risk. Always consult your doctor first."
    },
    {
      question: "What are Braxton Hicks contractions?",
      answer: "Braxton Hicks are 'practice' contractions that prepare your body for labor. They're irregular, usually painless, and don't increase in intensity. Unlike true labor contractions, they don't cause cervical dilation."
    }
  ];

  const prenatalTips = [
    {
      category: "Nutrition",
      tips: [
        "Eat folate-rich foods (leafy greens, beans, citrus)",
        "Include iron sources (lean meat, spinach, fortified cereals)",
        "Get enough calcium (dairy, fortified plant milk, almonds)",
        "Choose complex carbohydrates for sustained energy",
        "Include omega-3 fatty acids (salmon, walnuts, chia seeds)"
      ]
    },
    {
      category: "Exercise",
      tips: [
        "Aim for 30 minutes of moderate activity most days",
        "Try prenatal yoga for flexibility and relaxation",
        "Swimming is excellent for joint-friendly exercise",
        "Practice pelvic floor exercises (Kegels)",
        "Listen to your body and don't overexert"
      ]
    },
    {
      category: "Self-Care",
      tips: [
        "Get 7-9 hours of sleep per night",
        "Stay hydrated throughout the day",
        "Manage stress through meditation or deep breathing",
        "Moisturize skin to help prevent stretch marks",
        "Take time for activities you enjoy"
      ]
    },
    {
      category: "Safety",
      tips: [
        "Avoid hot tubs and saunas",
        "Wear your seatbelt properly (under and over belly)",
        "Use gentle, pregnancy-safe cleaning products",
        "Avoid changing cat litter (toxoplasmosis risk)",
        "Stay away from paint fumes and strong chemicals"
      ]
    }
  ];

  const handleAskQuestion = () => {
    if (!currentQuestion.trim()) return;

    const newMessage = { type: 'user', text: currentQuestion };
    const matchedFaq = commonFaqs.find(faq => 
      faq.question.toLowerCase().includes(currentQuestion.toLowerCase()) ||
      currentQuestion.toLowerCase().includes(faq.question.toLowerCase().split(' ').slice(0, 3).join(' ').toLowerCase())
    );

    let response = matchedFaq 
      ? matchedFaq.answer
      : "I'd be happy to help! For specific medical concerns, please consult your healthcare provider. For general pregnancy questions, try asking about nutrition, exercise, symptoms, or baby development.";

    setChatMessages([...chatMessages, newMessage, { type: 'ai', text: response }]);
    setCurrentQuestion('');
  };

  const addReminder = () => {
    if (newReminder.title && newReminder.date) {
      setReminders([...reminders, { 
        id: Date.now(), 
        title: newReminder.title, 
        date: newReminder.date, 
        completed: false 
      }]);
      setNewReminder({ title: '', date: '' });
      setShowAddReminder(false);
    }
  };

  const toggleReminder = (id) => {
    setReminders(reminders.map(r => 
      r.id === id ? { ...r, completed: !r.completed } : r
    ));
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const filteredFaqs = commonFaqs.filter(faq =>
    faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
    faq.answer.toLowerCase().includes(faqSearch.toLowerCase())
  );

  const renderHome = () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 rounded-2xl bg-pink-100 flex items-center justify-center mx-auto">
          <Baby className="w-10 h-10 text-pink-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Pregnancy Mode</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your comprehensive pregnancy companion with week-by-week guidance and prenatal care support.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <button
          onClick={() => setCurrentView('weekly')}
          className="p-8 bg-white border-2 border-pink-200 rounded-2xl hover:shadow-lg transition-all text-left"
        >
          <div className="w-14 h-14 rounded-xl bg-pink-100 flex items-center justify-center mb-6">
            <BookOpen className="w-7 h-7 text-pink-600" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900">Week-by-Week Guide</h3>
          <p className="text-gray-600">Detailed information about your baby's development and what to expect each week.</p>
        </button>

        <button
          onClick={() => setCurrentView('faq')}
          className="p-8 bg-white border-2 border-pink-200 rounded-2xl hover:shadow-lg transition-all text-left"
        >
          <div className="w-14 h-14 rounded-xl bg-pink-100 flex items-center justify-center mb-6">
            <Baby className="w-7 h-7 text-pink-600" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900">AI FAQ Assistant</h3>
          <p className="text-gray-600">Get instant answers to your pregnancy questions from our AI-powered assistant.</p>
        </button>

        <button
          onClick={() => setCurrentView('reminders')}
          className="p-8 bg-white border-2 border-pink-200 rounded-2xl hover:shadow-lg transition-all text-left"
        >
          <div className="w-14 h-14 rounded-xl bg-pink-100 flex items-center justify-center mb-6">
            <Bell className="w-7 h-7 text-pink-600" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900">Doctor Reminders</h3>
          <p className="text-gray-600">Never miss an appointment with smart reminders for checkups and tests.</p>
        </button>

        <button
          onClick={() => setCurrentView('tips')}
          className="p-8 bg-white border-2 border-pink-200 rounded-2xl hover:shadow-lg transition-all text-left"
        >
          <div className="w-14 h-14 rounded-xl bg-pink-100 flex items-center justify-center mb-6">
            <Stethoscope className="w-7 h-7 text-pink-600" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900">Prenatal Care Tips</h3>
          <p className="text-gray-600">Personalized advice on nutrition, exercise, and wellness during pregnancy.</p>
        </button>
      </div>
    </div>
  );

  const renderWeeklyGuide = () => {
    const guide = weeklyGuide[currentWeek] || weeklyGuide[12];
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Week-by-Week Guide</h2>
        </div>

        <div className="bg-pink-50 p-6 rounded-2xl border-2 border-pink-200">
          <div className="flex items-center gap-4 mb-4">
            <Calendar className="w-8 h-8 text-pink-600" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Week {currentWeek}</h3>
              <p className="text-gray-600">Your baby is about the size of a {guide.babySize}</p>
            </div>
          </div>
          <div className="flex gap-6 text-sm text-gray-700">
            <div>
              <span className="font-semibold">Length:</span> {guide.babyLength}
            </div>
            <div>
              <span className="font-semibold">Weight:</span> {guide.babyWeight}
            </div>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          {[12, 20, 30].map(week => (
            <button
              key={week}
              onClick={() => setCurrentWeek(week)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentWeek === week
                  ? 'bg-pink-600 text-white'
                  : 'bg-white border-2 border-pink-200 text-gray-700 hover:bg-pink-50'
              }`}
            >
              Week {week}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border-2 border-pink-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
              <Baby className="w-5 h-5 text-pink-600" />
              Baby's Development
            </h3>
            <ul className="space-y-3">
              {guide.developments.map((dev, idx) => (
                <li key={idx} className="flex gap-3 text-gray-700">
                  <span className="text-pink-600 mt-1">•</span>
                  <span>{dev}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border-2 border-pink-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-pink-600" />
              Your Body Changes
            </h3>
            <ul className="space-y-3">
              {guide.motherChanges.map((change, idx) => (
                <li key={idx} className="flex gap-3 text-gray-700">
                  <span className="text-pink-600 mt-1">•</span>
                  <span>{change}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border-2 border-pink-200">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">This Week's Tips</h3>
          <ul className="space-y-3">
            {guide.tips.map((tip, idx) => (
              <li key={idx} className="flex gap-3 text-gray-700">
                <span className="text-pink-600 mt-1">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const renderFAQ = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">AI FAQ Assistant</h2>

      <div className="bg-pink-50 p-6 rounded-2xl border-2 border-pink-200">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search common questions..."
            value={faqSearch}
            onChange={(e) => setFaqSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:border-pink-400"
          />
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredFaqs.map((faq, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border-2 border-pink-100">
              <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
              <p className="text-gray-700 text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border-2 border-pink-200">
        <h3 className="text-xl font-semibold mb-4 text-gray-900">Ask a Question</h3>
        
        <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
          {chatMessages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-md p-3 rounded-xl ${
                msg.type === 'user' 
                  ? 'bg-pink-600 text-white' 
                  : 'bg-pink-50 text-gray-800 border-2 border-pink-200'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={currentQuestion}
            onChange={(e) => setCurrentQuestion(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAskQuestion()}
            placeholder="Type your pregnancy question..."
            className="flex-1 px-4 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:border-pink-400"
          />
          <button
            onClick={handleAskQuestion}
            className="px-6 py-3 bg-pink-600 text-white rounded-xl font-medium hover:bg-pink-700 transition-colors"
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );

  const renderReminders = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Doctor Reminders</h2>
        <button
          onClick={() => setShowAddReminder(!showAddReminder)}
          className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-xl font-medium hover:bg-pink-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Reminder
        </button>
      </div>

      {showAddReminder && (
        <div className="bg-pink-50 p-6 rounded-2xl border-2 border-pink-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">New Reminder</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Appointment or test name"
              value={newReminder.title}
              onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
              className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:border-pink-400"
            />
            <input
              type="date"
              value={newReminder.date}
              onChange={(e) => setNewReminder({ ...newReminder, date: e.target.value })}
              className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:border-pink-400"
            />
            <div className="flex gap-2">
              <button
                onClick={addReminder}
                className="flex-1 px-4 py-2 bg-pink-600 text-white rounded-xl font-medium hover:bg-pink-700 transition-colors"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setShowAddReminder(false);
                  setNewReminder({ title: '', date: '' });
                }}
                className="px-4 py-2 bg-white border-2 border-pink-200 text-gray-700 rounded-xl font-medium hover:bg-pink-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {reminders.sort((a, b) => new Date(a.date) - new Date(b.date)).map(reminder => (
          <div
            key={reminder.id}
            className={`bg-white p-6 rounded-2xl border-2 transition-all ${
              reminder.completed ? 'border-pink-200 opacity-60' : 'border-pink-300'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <button
                  onClick={() => toggleReminder(reminder.id)}
                  className={`mt-1 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
                    reminder.completed
                      ? 'bg-pink-600 border-pink-600'
                      : 'border-pink-300 hover:border-pink-400'
                  }`}
                >
                  {reminder.completed && <Check className="w-4 h-4 text-white" />}
                </button>
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold ${
                    reminder.completed ? 'line-through text-gray-500' : 'text-gray-900'
                  }`}>
                    {reminder.title}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {new Date(reminder.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
              <button
                onClick={() => deleteReminder(reminder.id)}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {reminders.length === 0 && (
        <div className="text-center py-12 bg-pink-50 rounded-2xl border-2 border-pink-200">
          <Bell className="w-12 h-12 text-pink-300 mx-auto mb-4" />
          <p className="text-gray-600">No reminders yet. Add your first appointment!</p>
        </div>
      )}
    </div>
  );

  const renderTips = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Prenatal Care Tips</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {prenatalTips.map((section, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border-2 border-pink-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{section.category}</h3>
            </div>
            <ul className="space-y-3">
              {section.tips.map((tip, tipIdx) => (
                <li key={tipIdx} className="flex gap-3 text-gray-700">
                  <span className="text-pink-600 mt-1">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-pink-50 p-6 rounded-2xl border-2 border-pink-200">
        <h3 className="text-xl font-semibold mb-3 text-gray-900">Important Reminder</h3>
        <p className="text-gray-700">
          These tips are general guidelines. Always consult with your healthcare provider before making any significant changes to your diet, exercise routine, or lifestyle during pregnancy. Every pregnancy is unique, and your doctor can provide personalized advice based on your specific situation.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-pink-50">
      <div className="container px-4 py-12 mx-auto max-w-6xl">
        {currentView !== 'home' && (
          <button
            onClick={() => setCurrentView('home')}
            className="mb-8 flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-pink-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back to Home</span>
          </button>
        )}

        {currentView === 'home' && renderHome()}
        {currentView === 'weekly' && renderWeeklyGuide()}
        {currentView === 'faq' && renderFAQ()}
        {currentView === 'reminders' && renderReminders()}
        {currentView === 'tips' && renderTips()}
      </div>
    </div>
  );
};

export default PregnancyTracker;