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
      babySize: "Small Lemon",
      babyLength: "5.5 cm",
      babyWeight: "14 grams",
      developments: [
        "Reflexes are starting - tiny fingers opening and closing, toes curling",
        "Bone marrow is busy making white blood cells",
        "The little one is slowly learning and growing inside you",
        "Baby is moving quietly, though you won't feel it yet"
      ],
      motherChanges: [
        "Fatigue - you might feel tired or sleepy, it's completely normal",
        "Nausea - some queasy moments may still appear, eat small meals and sip water often",
        "Breast tenderness or swelling - your body is preparing for feeding your baby",
        "Bloating or gas - a little discomfort can happen, eat light and frequently",
        "Mood swings - feeling emotional or irritable sometimes is normal",
        "Mild cramps - occasional tugs or pulls in your lower belly are okay",
        "Frequent urination - your bladder is adjusting to the little one",
        "Food cravings or aversions - all part of the process, trust your instincts"
      ],
      tips: [
        "Drink plenty of water, aim for 8-10 glasses",
        "Have small, nutritious meals regularly",
        "Short walks can help with digestion and energy",
        "Rest whenever your body asks for it",
        "Wear soft, comfortable clothes that don't feel tight",
        "Don't stress over every tiny symptom… most of it is perfectly normal 🌷",
        "Ayurvedic tip: A small glass of warm turmeric milk at night can be soothing and comforting"
      ]
    },
    20: {
      babySize: "Small Mango",
      babyLength: "16 cm",
      babyWeight: "300 grams",
      developments: [
        "Baby's senses are awakening; they can hear sounds and even react to light",
        "Tiny hair called lanugo covers the skin",
        "Movements become noticeable - soon you'll feel gentle kicks and flutters"
      ],
      motherChanges: [
        "You might feel more energetic now, though occasional fatigue is normal",
        "Baby kicks or flutters may start… it's a wonderful feeling",
        "Mild backaches - your uterus is growing, so pressure on the lower back happens",
        "Round ligament twinges in the belly or sides may appear",
        "Slight swelling in feet or hands - rings or shoes may feel tight",
        "Mood swings - feeling emotional or irritable is completely normal",
        "Increased appetite and food cravings or aversions may continue",
        "Skin changes like darkening of areolas or linea nigra may appear"
      ],
      tips: [
        "Keep sipping water throughout the day, around 8-10 glasses",
        "Focus on balanced meals with good protein, iron, and calcium",
        "Gentle walks or prenatal yoga can ease backaches and help circulation",
        "Choose comfortable maternity clothes and supportive shoes",
        "Rest whenever your body asks for it",
        "Avoid stress - meditation or deep breathing can help",
        "Ayurvedic tip: A small cup of warm ginger water in the morning can support digestion and comfort"
      ]
    },
    30: {
      babySize: "Large Cabbage",
      babyLength: "38 cm",
      babyWeight: "1.3 kg",
      developments: [
        "Baby's lungs are practicing breathing, and brain growth is rapid",
        "Senses like hearing and sight are sharpening",
        "Kicks and movements are strong and clearly noticeable now"
      ],
      motherChanges: [
        "Fatigue can be pronounced - extra weight and active baby take energy",
        "You may feel shortness of breath as the uterus presses on your diaphragm",
        "Backaches and pelvic pressure are common - gentle support helps",
        "Swelling in feet, ankles, or hands may appear",
        "Frequent urination continues",
        "Mild, irregular Braxton Hicks contractions may start - completely normal",
        "Heartburn or indigestion may occur - eat lighter meals",
        "Mood swings and pre-delivery anxiety are natural"
      ],
      tips: [
        "Keep sipping water throughout the day, 8-10 glasses",
        "Eat small, frequent, nutritious meals to stay comfortable",
        "Gentle stretches, prenatal yoga, or short walks help back and circulation",
        "Wear supportive shoes and a maternity belt if needed",
        "Rest whenever your body asks for it",
        "Practice deep breathing or meditation to relax and calm the mind",
        "Ayurvedic tip: A warm cup of fennel water after meals can aid digestion and comfort"
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
        "Eat small, frequent meals to keep your digestion easy and energy steady",
        "Make sure each meal has dal, seasonal vegetables, whole grains, and fruits",
        "Keep sipping water throughout the day; warm water or lemon water in the morning is comforting",
        "Include calcium-rich foods like milk, curd, and paneer to keep bones and teeth strong",
        "Avoid overly fried or spicy foods; if you want something sweet, a handful of dry fruits or jaggery works well"
      ]
    },
    {
      category: "Exercises",
      tips: [
        "Short daily walks around your home or garden keep your body active and mood fresh",
        "Gentle prenatal yoga - cat-cow, pelvic tilts, legs-up-the-wall pose - is very helpful",
        "Stretch your back and shoulders lightly to release tension",
        "Avoid lifting anything heavy or sudden jerky movements",
        "Deep breathing exercises can help you relax and improve oxygen flow to your baby"
      ]
    },
    {
      category: "Self-Care",
      tips: [
        "Take short naps whenever you feel tired… your body deserves it",
        "Keep a warm compress handy for your back or belly if uncomfortable",
        "Light massages with coconut or mustard oil on lower back or feet can ease tension",
        "Use a supportive pillow when sleeping, especially lying on your side",
        "Moisturize skin daily to help prevent stretch marks; gentle massage with coconut or almond oil is nice",
        "Spend a few minutes in meditation, journaling, or simply quiet reflection daily"
      ]
    },
    {
      category: "Safety",
      tips: [
        "Don't stand for too long; take breaks and sit when tired",
        "Wear comfortable shoes to avoid slips or ankle strain",
        "Avoid raw or undercooked foods to protect yourself from infections",
        "Wash your hands before meals and after coming from outside; hygiene matters",
        "Be careful on stairs or while lifting anything… a little caution goes a long way"
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
      <div className="text-center space-y-4 mb-12">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center mx-auto shadow-lg">
          <Baby className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent">
          Pregnancy Mode
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your comprehensive pregnancy companion with week-by-week guidance and prenatal care support
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-pink-50 to-white p-6 rounded-2xl border border-pink-200">
          <div className="text-3xl font-bold text-pink-600 mb-1">Week {currentWeek}</div>
          <div className="text-sm text-gray-600">Current Week</div>
        </div>
        <div className="bg-gradient-to-br from-pink-50 to-white p-6 rounded-2xl border border-pink-200">
          <div className="text-3xl font-bold text-pink-600 mb-1">{reminders.filter(r => !r.completed).length}</div>
          <div className="text-sm text-gray-600">Upcoming Reminders</div>
        </div>
        <div className="bg-gradient-to-br from-pink-50 to-white p-6 rounded-2xl border border-pink-200">
          <div className="text-3xl font-bold text-pink-600 mb-1">{40 - currentWeek}</div>
          <div className="text-sm text-gray-600">Weeks to Go</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <button
            onClick={() => setCurrentView('weekly')}
            className="flex flex-col items-center gap-3 p-6 rounded-xl hover:bg-pink-50 transition-all group"
          >
            <div className="w-14 h-14 rounded-full bg-pink-100 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="w-7 h-7 text-pink-600" />
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">Weekly Guide</div>
              <div className="text-xs text-gray-500 mt-1">Track progress</div>
            </div>
          </button>

          <button
            onClick={() => setCurrentView('faq')}
            className="flex flex-col items-center gap-3 p-6 rounded-xl hover:bg-pink-50 transition-all group"
          >
            <div className="w-14 h-14 rounded-full bg-pink-100 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Baby className="w-7 h-7 text-pink-600" />
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">AI Assistant</div>
              <div className="text-xs text-gray-500 mt-1">Ask questions</div>
            </div>
          </button>

          <button
            onClick={() => setCurrentView('reminders')}
            className="flex flex-col items-center gap-3 p-6 rounded-xl hover:bg-pink-50 transition-all group"
          >
            <div className="w-14 h-14 rounded-full bg-pink-100 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Bell className="w-7 h-7 text-pink-600" />
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">Reminders</div>
              <div className="text-xs text-gray-500 mt-1">Track appointments</div>
            </div>
          </button>

          <button
            onClick={() => setCurrentView('tips')}
            className="flex flex-col items-center gap-3 p-6 rounded-xl hover:bg-pink-50 transition-all group"
          >
            <div className="w-14 h-14 rounded-full bg-pink-100 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Stethoscope className="w-7 h-7 text-pink-600" />
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">Care Tips</div>
              <div className="text-xs text-gray-500 mt-1">Stay healthy</div>
            </div>
          </button>
        </div>
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
            className="flex items-center gap-2 mb-6 px-4 py-2 bg-white rounded-xl border-2 border-pink-200 text-gray-700 hover:bg-pink-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
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