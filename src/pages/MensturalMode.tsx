import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Calendar, Activity, TrendingUp, ArrowLeft, Plus, Minus, ChevronLeft, ChevronRight, Droplets, Coffee, Thermometer, Package, ShoppingBag } from "lucide-react";

const MenstrualMode = () => {
  const [activeTab, setActiveTab] = useState("calendar");

  const [cycleData, setCycleData] = useState({
    lastPeriodStart: null,
    cycleLength: 28,
    periodLength: 5,
  });
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [periodDates, setPeriodDates] = useState([]);
  const [symptoms, setSymptoms] = useState({});
  const [moodLog, setMoodLog] = useState({});
  const [painLog, setPainLog] = useState({});
  const [flowIntensity, setFlowIntensity] = useState({});
  const [waterIntake, setWaterIntake] = useState({});

  // Calendar logic
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const formatDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const isPeriodDate = (date) => {
    return periodDates.includes(formatDate(date));
  };

  const isPredictedPeriod = (date) => {
    if (!cycleData.lastPeriodStart) return false;
    const lastStart = new Date(cycleData.lastPeriodStart);
    const daysDiff = Math.floor((date - lastStart) / (1000 * 60 * 60 * 24));
    const cyclePosition = daysDiff % cycleData.cycleLength;
    return cyclePosition >= 0 && cyclePosition < cycleData.periodLength && !isPeriodDate(date);
  };

  const getPeriodDay = (date) => {
    if (!cycleData.lastPeriodStart || !isPeriodDate(date)) return null;
    const sortedDates = [...periodDates].sort();
    const dateStr = formatDate(date);
    const firstPeriodDate = sortedDates[0];
    const daysDiff = Math.floor((date - new Date(firstPeriodDate)) / (1000 * 60 * 60 * 24));
    return daysDiff + 1;
  };

  const togglePeriodDate = (date) => {
    const dateStr = formatDate(date);
    if (periodDates.includes(dateStr)) {
      setPeriodDates(periodDates.filter(d => d !== dateStr));
    } else {
      const newDates = [...periodDates, dateStr].sort();
      setPeriodDates(newDates);
      if (!cycleData.lastPeriodStart) {
        setCycleData({ ...cycleData, lastPeriodStart: dateStr });
      }
    }
  };

  const changeMonth = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setSelectedDate(newDate);
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(selectedDate);
    const days = [];
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
      const dateStr = formatDate(date);
      const isPeriod = isPeriodDate(date);
      const isPredicted = isPredictedPeriod(date);
      const hasSymptoms = symptoms[dateStr]?.length > 0;
      const hasMood = moodLog[dateStr];
      const hasPain = painLog[dateStr];

      days.push(
        <button
          key={day}
          onClick={() => togglePeriodDate(date)}
          className={`aspect-square p-2 rounded-xl text-sm font-medium transition-all relative border-2
            ${isPeriod ? 'bg-rose-500 text-white hover:bg-rose-600 border-rose-600' : ''}
            ${isPredicted ? 'bg-rose-100 text-rose-900 hover:bg-rose-200 border-rose-300' : ''}
            ${!isPeriod && !isPredicted ? 'hover:bg-gray-50 border-gray-200' : ''}
          `}
        >
          <div>{day}</div>
          {(hasSymptoms || hasMood || hasPain) && (
            <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-0.5">
              {hasSymptoms && <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
              {hasMood && <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />}
              {hasPain && <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />}
            </div>
          )}
        </button>
      );
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h3 className="text-xl font-semibold">
            {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          <button onClick={() => changeMonth(1)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDays.map(day => (
            <div key={day} className="text-center text-sm font-semibold text-gray-600 pb-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days}
        </div>
        <div className="flex gap-4 text-sm mt-6 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-rose-500 border-2 border-rose-600" />
            <span>Period logged</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-rose-100 border-2 border-rose-300" />
            <span>Predicted period</span>
          </div>
        </div>
      </div>
    );
  };

  const symptomsList = [
    "Cramps", "Headache", "Bloating", "Fatigue", 
    "Back pain", "Breast tenderness", "Nausea", "Acne"
  ];

  const moods = [
    { emoji: "😊", label: "Happy", value: "happy" },
    { emoji: "😐", label: "Neutral", value: "neutral" },
    { emoji: "😢", label: "Sad", value: "sad" },
    { emoji: "😠", label: "Irritable", value: "irritable" },
    { emoji: "😰", label: "Anxious", value: "anxious" },
  ];

  const flowLevels = [
    { label: "Light", value: "light", color: "bg-pink-200" },
    { label: "Medium", value: "medium", color: "bg-pink-400" },
    { label: "Heavy", value: "heavy", color: "bg-rose-600" },
  ];

  const renderSymptomTracker = () => {
    const today = formatDate(new Date());
    const currentSymptoms = symptoms[today] || [];
    const currentFlow = flowIntensity[today];
    const currentWater = waterIntake[today] || 0;

    const toggleSymptom = (symptom) => {
      const updated = currentSymptoms.includes(symptom)
        ? currentSymptoms.filter(s => s !== symptom)
        : [...currentSymptoms, symptom];
      setSymptoms({ ...symptoms, [today]: updated });
    };

    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">How are you feeling today?</h3>
          <p className="text-gray-600">Track your symptoms to identify patterns</p>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-lg flex items-center gap-2">
            <Droplets className="w-5 h-5 text-rose-600" />
            Flow Intensity
          </h4>
          <div className="flex gap-3">
            {flowLevels.map(flow => (
              <button
                key={flow.value}
                onClick={() => setFlowIntensity({ ...flowIntensity, [today]: flow.value })}
                className={`flex-1 p-4 rounded-xl border-2 transition-all
                  ${currentFlow === flow.value 
                    ? 'border-rose-500 bg-rose-50' 
                    : 'border-gray-300 hover:border-rose-400'}
                `}
              >
                <div className={`w-8 h-8 rounded-full ${flow.color} mx-auto mb-2`}></div>
                <div className="font-medium text-sm">{flow.label}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-lg flex items-center gap-2">
            <Coffee className="w-5 h-5 text-blue-600" />
            Water Intake
          </h4>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setWaterIntake({ ...waterIntake, [today]: Math.max(0, currentWater - 1) })}
              className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 transition-colors"
            >
              <Minus className="w-5 h-5" />
            </button>
            <div className="flex-1 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">{currentWater}</div>
              <div className="text-sm text-gray-600">glasses today</div>
              <div className="text-xs text-gray-500 mt-1">Goal: 8-10 glasses</div>
            </div>
            <button
              onClick={() => setWaterIntake({ ...waterIntake, [today]: currentWater + 1 })}
              className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-lg flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            Common Symptoms
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {symptomsList.map(symptom => (
              <button
                key={symptom}
                onClick={() => toggleSymptom(symptom)}
                className={`p-4 rounded-xl border-2 transition-all text-left
                  ${currentSymptoms.includes(symptom) 
                    ? 'border-blue-500 bg-blue-50 text-blue-900' 
                    : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'}
                `}
              >
                <div className="font-medium">{symptom}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-lg flex items-center gap-2">
            <Heart className="w-5 h-5 text-purple-600" />
            Mood
          </h4>
          <div className="flex gap-3 flex-wrap">
            {moods.map(mood => (
              <button
                key={mood.value}
                onClick={() => setMoodLog({ ...moodLog, [today]: mood.value })}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2
                  ${moodLog[today] === mood.value 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50'}
                `}
              >
                <div className="text-3xl">{mood.emoji}</div>
                <div className="text-sm font-medium">{mood.label}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            Pain Level
          </h4>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setPainLog({ ...painLog, [today]: Math.max(0, (painLog[today] || 0) - 1) })}
              className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 transition-colors"
            >
              <Minus className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">No pain</span>
                <span className="text-2xl font-bold text-orange-600">{painLog[today] || 0}/10</span>
                <span className="text-sm text-gray-600">Severe</span>
              </div>
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden border-2 border-gray-300">
                <div 
                  className={`h-full transition-all ${
                    (painLog[today] || 0) <= 3 ? 'bg-yellow-400' :
                    (painLog[today] || 0) <= 6 ? 'bg-orange-500' : 'bg-red-600'
                  }`}
                  style={{ width: `${((painLog[today] || 0) / 10) * 100}%` }}
                />
              </div>
            </div>
            <button
              onClick={() => setPainLog({ ...painLog, [today]: Math.min(10, (painLog[today] || 0) + 1) })}
              className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderComfortKit = () => {
    const today = new Date();
    const todayStr = formatDate(today);
    const periodDay = getPeriodDay(today);
    
    const getCurrentPeriodDay = () => {
      if (!cycleData.lastPeriodStart) return null;
      const sortedPeriodDates = [...periodDates].sort();
      if (sortedPeriodDates.length === 0) return null;
      
      const firstPeriodDate = new Date(sortedPeriodDates[0]);
      const daysDiff = Math.floor((today - firstPeriodDate) / (1000 * 60 * 60 * 24));
      
      if (daysDiff >= 0 && daysDiff < 7) {
        return daysDiff + 1;
      }
      return null;
    };

    const currentDay = getCurrentPeriodDay();

    const comfortKitData = {
      1: {
        title: "Day 1: The Heavy Flow Day 🌸",
        subtitle: "Be gentle with yourself",
        bag: [
          { icon: "🩹", name: "Sofy XL Neem Pads", desc: "Soft, big pads for heavy flow. Change every 6 hours" },
          { icon: "☕", name: "Sirona Menstrual Cup + Cleanser", desc: "If you're comfortable with cups" },
          { icon: "🎒", name: "Nua Period Kit", desc: "Great for travel with different absorbencies" }
        ],
        rituals: [
          "Sip warm water every hour with lemon or honey",
          "Skip heavy, fried food. Dark chocolate is great for mood",
          "Eat light, small meals to avoid bloating"
        ],
        movements: [
          "Take a slow 10-15 minute walk to improve blood flow",
          "Rest if it hurts. Your body deserves the break"
        ],
        warmth: [
          "Keep a hot water bag on your lower tummy or back",
          "Try a warm towel. Heat often works before medicine"
        ]
      },
      2: {
        title: "Day 2: The Slow Relief Day 🌙",
        subtitle: "Things start to feel lighter",
        bag: [
          { icon: "🩹", name: "Sofy XL or Nua Medium Pads", desc: "Switch based on your flow" },
          { icon: "🔥", name: "Heat Patch", desc: "Keep in bag for college or work" },
          { icon: "🍫", name: "Dark Chocolate", desc: "Tiny joys make a big difference" }
        ],
        rituals: [
          "Start morning with warm water and light fruit",
          "Eat something every 3-4 hours",
          "Before sleep: warm milk with pinch of turmeric"
        ],
        movements: [
          "Pelvic Tilt: Lie back, bend knees, lift hips slightly",
          "Legs-Up-the-Wall: Rest legs on wall for 5-10 minutes"
        ],
        warmth: [
          "Keep hot water bag nearby for cramps",
          "Stay warm with light shawl or soft socks"
        ]
      },
      3: {
        title: "Day 3: The Energy Return Day 🌤",
        subtitle: "Energy is coming back",
        bag: [
          { icon: "🩹", name: "Regular Pads or Cup", desc: "Based on your comfort" },
          { icon: "🧻", name: "Wet Wipes", desc: "Freshness makes a difference" }
        ],
        rituals: [
          "Stay hydrated: coconut water or buttermilk",
          "Eat simple food: warm dal, rice, khichdi, soup",
          "Herbal tea or dark chocolate as treat"
        ],
        movements: [
          "Cat-Cow Stretch: On all fours, arch back up and down",
          "Short 15-20 minute walk",
          "Deep breathing: inhale deeply, exhale slowly"
        ],
        warmth: [
          "Keep hot water bag close just in case",
          "Light back massage with warm coconut oil"
        ]
      },
      4: {
        title: "Day 4+: The Ease Day ☀️",
        subtitle: "Energy finds its rhythm",
        bag: [
          { icon: "🩹", name: "Regular Pads or Liners", desc: "For light flow" },
          { icon: "👙", name: "Fresh Undergarments", desc: "Keep a spare set" }
        ],
        rituals: [
          "Keep sipping warm water or herbal teas",
          "Return to normal meals, add one warm home-cooked dish",
          "Take quiet minutes for yourself: write, stretch, or sit in peace"
        ],
        movements: [
          "Light 20-25 minute walk or gentle yoga",
          "Bridge Pose: Lie down, bend knees, lift hips",
          "Let body move naturally, slow and kind"
        ],
        warmth: [
          "End day with warm shower or foot soak",
          "Let warmth help you unwind"
        ]
      }
    };

    const dayData = currentDay && currentDay <= 4 ? comfortKitData[currentDay] : comfortKitData[4];

    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-2 bg-rose-100 rounded-full mb-4">
            <span className="text-rose-700 font-semibold">
              {currentDay ? `Period Day ${currentDay}` : 'Your Comfort Guide'}
            </span>
          </div>
          <h3 className="text-2xl font-bold mb-2">{dayData.title}</h3>
          <p className="text-gray-600">{dayData.subtitle}</p>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border-2 border-rose-200">
            <h4 className="font-semibold text-lg mb-4 flex items-center gap-2 text-rose-900">
              <ShoppingBag className="w-5 h-5" />
              Just-in-Case Bag
            </h4>
            <div className="space-y-3">
              {dayData.bag.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-rose-200">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="font-medium text-rose-900">{item.name}</div>
                    <div className="text-sm text-rose-700">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
            <h4 className="font-semibold text-lg mb-4 flex items-center gap-2 text-purple-900">
              <Coffee className="w-5 h-5" />
              Comfort Rituals
            </h4>
            <div className="space-y-2">
              {dayData.rituals.map((ritual, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-purple-200">
                  <span className="text-purple-600 mt-0.5">•</span>
                  <span className="text-purple-900">{ritual}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
            <h4 className="font-semibold text-lg mb-4 flex items-center gap-2 text-blue-900">
              <Activity className="w-5 h-5" />
              Gentle Movements
            </h4>
            <div className="space-y-2">
              {dayData.movements.map((movement, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-blue-200">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span className="text-blue-900">{movement}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-orange-200">
            <h4 className="font-semibold text-lg mb-4 flex items-center gap-2 text-orange-900">
              <Thermometer className="w-5 h-5" />
              Warmth & Relief
            </h4>
            <div className="space-y-2">
              {dayData.warmth.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-orange-200">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span className="text-orange-900">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderInsights = () => {
    const totalDays = Object.keys(symptoms).length;
    const symptomFrequency = {};
    Object.values(symptoms).forEach((daySymptoms) => {
      daySymptoms.forEach(symptom => {
        symptomFrequency[symptom] = (symptomFrequency[symptom] || 0) + 1;
      });
    });

    const avgPain = Object.values(painLog).length > 0
      ? (
          Object.values(painLog)
            .reduce((a, b) => Number(a) + Number(b), 0) / Object.values(painLog).length
        ).toFixed(1)
      : 0;

    const avgWater = Object.values(waterIntake).length > 0
      ? (
          Object.values(waterIntake)
            .reduce((a, b) => Number(a) + Number(b), 0) / Object.values(waterIntake).length
        ).toFixed(1)
      : 0;
 
    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">Your Cycle Insights</h3>
          <p className="text-gray-600">Understanding your patterns</p>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl bg-rose-50 border-2 border-rose-300">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-3xl font-bold text-rose-900 mb-1">{periodDates.length}</div>
            <div className="text-sm text-rose-700 font-medium">Period days logged</div>
          </div>
          
          <div className="p-6 rounded-2xl bg-orange-50 border-2 border-orange-300">
            <div className="text-3xl mb-2">💪</div>
            <div className="text-3xl font-bold text-orange-900 mb-1">{avgPain}</div>
            <div className="text-sm text-orange-700 font-medium">Average pain level</div>
          </div>
          
          <div className="p-6 rounded-2xl bg-blue-50 border-2 border-blue-300">
            <div className="text-3xl mb-2">💧</div>
            <div className="text-3xl font-bold text-blue-900 mb-1">{avgWater}</div>
            <div className="text-sm text-blue-700 font-medium">Avg glasses/day</div>
          </div>
          
          <div className="p-6 rounded-2xl bg-purple-50 border-2 border-purple-300">
            <div className="text-3xl mb-2">📝</div>
            <div className="text-3xl font-bold text-purple-900 mb-1">{totalDays}</div>
            <div className="text-sm text-purple-700 font-medium">Days tracked</div>
          </div>
        </div>

        {Object.keys(symptomFrequency).length > 0 && (
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Most Common Symptoms</h4>
            <div className="space-y-3">
              {Object.entries(symptomFrequency)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([symptom, count]) => (
                  <div key={symptom} className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{symptom}</span>
                        <span className="text-sm text-gray-600">{count} times</span>
                      </div>
                      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden border border-gray-300">
                        <div 
                          className="h-full bg-blue-500"
                          style={{ width: `${(count / totalDays) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        <div className="p-6 rounded-2xl bg-teal-50 border-2 border-teal-300">
          <h4 className="font-semibold text-lg mb-4 text-teal-900 flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Personalized Recommendations
          </h4>
          <div className="space-y-3 text-teal-800">
            {avgPain > 5 && (
              <div className="p-3 bg-white rounded-lg border border-teal-200">
                💊 Your pain levels are high. Consider gentle exercises and heat therapy. If pain persists, consult a doctor.
              </div>
            )}
            {avgWater < 6 && (
              <div className="p-3 bg-white rounded-lg border border-teal-200">
                💧 Try to increase your water intake. Staying hydrated can help reduce bloating and headaches.
              </div>
            )}
            {symptomFrequency['Cramps'] > 2 && (
              <div className="p-3 bg-white rounded-lg border border-teal-200">
                🌸 Frequent cramps detected. Try magnesium-rich foods like bananas, nuts, and dark chocolate.
              </div>
            )}
            {Object.keys(symptomFrequency).length === 0 && (
              <div className="p-3 bg-white rounded-lg border border-teal-200">
                ✨ Start tracking your symptoms daily to get personalized insights and recommendations.
              </div>
            )}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-300">
          <h4 className="font-semibold text-lg mb-4 text-indigo-900 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Cycle Summary
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-indigo-200">
              <span className="text-indigo-900 font-medium">Average Cycle Length</span>
              <span className="text-2xl font-bold text-indigo-700">{cycleData.cycleLength} days</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-indigo-200">
              <span className="text-indigo-900 font-medium">Period Duration</span>
              <span className="text-2xl font-bold text-indigo-700">{cycleData.periodLength} days</span>
            </div>
            {cycleData.lastPeriodStart && (
              <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-indigo-200">
                <span className="text-indigo-900 font-medium">Last Period Started</span>
                <span className="text-lg font-bold text-indigo-700">
                  {new Date(cycleData.lastPeriodStart).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-rose-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-10 h-10" />
              <h1 className="text-4xl font-bold">Period Care Companion</h1>
            </div>
            <p className="text-rose-100 text-lg">Track your cycle, understand your body, care for yourself</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b-2 border-gray-200 bg-gray-50">
            <button
              onClick={() => setActiveTab("calendar")}
              className={`flex-1 py-4 px-6 font-semibold transition-all flex items-center justify-center gap-2
                ${activeTab === "calendar" 
                  ? "bg-white text-rose-600 border-b-4 border-rose-500" 
                  : "text-gray-600 hover:bg-gray-100"}`}
            >
              <Calendar className="w-5 h-5" />
              Calendar
            </button>
            <button
              onClick={() => setActiveTab("tracker")}
              className={`flex-1 py-4 px-6 font-semibold transition-all flex items-center justify-center gap-2
                ${activeTab === "tracker" 
                  ? "bg-white text-rose-600 border-b-4 border-rose-500" 
                  : "text-gray-600 hover:bg-gray-100"}`}
            >
              <Activity className="w-5 h-5" />
              Daily Log
            </button>
            <button
              onClick={() => setActiveTab("comfort")}
              className={`flex-1 py-4 px-6 font-semibold transition-all flex items-center justify-center gap-2
                ${activeTab === "comfort" 
                  ? "bg-white text-rose-600 border-b-4 border-rose-500" 
                  : "text-gray-600 hover:bg-gray-100"}`}
            >
              <Package className="w-5 h-5" />
              Comfort Kit
            </button>
            <button
              onClick={() => setActiveTab("insights")}
              className={`flex-1 py-4 px-6 font-semibold transition-all flex items-center justify-center gap-2
                ${activeTab === "insights" 
                  ? "bg-white text-rose-600 border-b-4 border-rose-500" 
                  : "text-gray-600 hover:bg-gray-100"}`}
            >
              <TrendingUp className="w-5 h-5" />
              Insights
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            {activeTab === "calendar" && renderCalendar()}
            {activeTab === "tracker" && renderSymptomTracker()}
            {activeTab === "comfort" && renderComfortKit()}
            {activeTab === "insights" && renderInsights()}
          </div>
        </div>

        {/* Footer note */}
        <div className="text-center mt-8 text-gray-600 text-sm">
          <p>💝 Remember: Every body is different. This is a guide, not medical advice.</p>
          <p className="mt-2">Always consult a healthcare provider for concerns.</p>
        </div>
      </div>
    </div>
  );
};

export default MenstrualMode;