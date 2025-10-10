import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Calendar, Activity, TrendingUp, ArrowLeft, Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MenstrualMode = () => {
  const [activeTab, setActiveTab] = useState("calendar");

  const navigate = useNavigate();

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
    const lastStart : any = new Date(cycleData.lastPeriodStart);
    const daysDiff = Math.floor((date - lastStart) / (1000 * 60 * 60 * 24));
    const cyclePosition = daysDiff % cycleData.cycleLength;
    return cyclePosition >= 0 && cyclePosition < cycleData.periodLength && !isPeriodDate(date);
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

  const renderSymptomTracker = () => {
    const today = formatDate(new Date());
    const currentSymptoms = symptoms[today] || [];

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

  const renderInsights = () => {
    const totalDays = Object.keys(symptoms).length;
    const symptomFrequency = {};
    Object.values(symptoms).forEach((daySymptoms : any) => {
      daySymptoms.forEach(symptom => {
        symptomFrequency[symptom] = (symptomFrequency[symptom] || 0) + 1;
      });
    });

    const avgPain : any = Object.values(painLog).length > 0
      ? (
          Object.values(painLog)
            .reduce((a: number, b: any) => Number(a) + Number(b), 0) / Object.values(painLog).length
        ).toFixed(1)
      : 0;
 
    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">Your Cycle Insights</h3>
          <p className="text-gray-600">Understanding your patterns</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
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
                .sort((a : any, b : any) => b[1] - a[1])
                .slice(0, 5)
                .map(([symptom, count] : any) => (
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
            Comfort Kit Recommendations
          </h4>
          <div className="space-y-3 text-teal-800">
            {avgPain > 5 && <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-teal-200">
              <span className="text-lg">🔥</span>
              <span>Try a heating pad for cramp relief</span>
            </div>}
            {symptomFrequency["Headache"] > 2 && <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-teal-200">
              <span className="text-lg">🧘‍♀️</span>
              <span>Consider relaxation exercises for headaches</span>
            </div>}
            {symptomFrequency["Bloating"] > 2 && <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-teal-200">
              <span className="text-lg">🍵</span>
              <span>Herbal teas may help with bloating</span>
            </div>}
            <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-teal-200">
              <span className="text-lg">💧</span>
              <span>Stay hydrated throughout your cycle</span>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-teal-200">
              <span className="text-lg">🏃‍♀️</span>
              <span>Light exercise can help reduce symptoms</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const tabs = [
    { id: "calendar", icon: Calendar, label: "Period Tracking" },
    { id: "symptoms", icon: Activity, label: "Daily Log" },
    { id: "insights", icon: TrendingUp, label: "Insights" },
  ];

  return (
    <div className="min-h-screen bg-pink-50">
      <div className="container px-4 py-8 mx-auto max-w-5xl">
        <Button variant="ghost" className="mb-6" onClick={() => navigate("/")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-rose-500 flex items-center justify-center mx-auto mb-4 shadow-lg border-2 border-rose-600">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-3 text-rose-900">
            Menstrual Mode
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your personal companion for tracking periods, symptoms, and wellness
          </p>
        </div>

        <div className="flex gap-2 mb-8 p-1 bg-white rounded-xl shadow-md border-2 border-gray-200 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap
                ${activeTab === tab.id 
                  ? 'bg-rose-500 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-50'}
              `}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border-2 border-gray-200">
          {activeTab === "calendar" && renderCalendar()}
          {activeTab === "symptoms" && renderSymptomTracker()}
          {activeTab === "insights" && renderInsights()}
        </div>
      </div>
    </div>
  );
};

export default MenstrualMode;