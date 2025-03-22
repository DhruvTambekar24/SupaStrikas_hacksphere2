import React from "react";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-blue-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">
        <div>
          <div className="text-purple-700 font-bold text-xl mb-6">
            <span className="text-black">Gyaan</span>Sphere
          </div>
          <nav>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-purple-700 font-semibold">
                <span className="material-icons">dashboard</span>
                Dashboard
              </li>
              <li className="flex items-center gap-3 text-gray-600 hover:text-purple-700 cursor-pointer">
                <span className="material-icons">menu_book</span>
                Learn
              </li>
              <li className="flex items-center gap-3 text-gray-600 hover:text-purple-700 cursor-pointer">
                <span className="material-icons">token</span>
                Stake Tokens
              </li>
              <li className="flex items-center gap-3 text-gray-600 hover:text-purple-700 cursor-pointer">
                <span className="material-icons">chat</span>
                AI Tutor
              </li>
              <li className="flex items-center gap-3 text-gray-600 hover:text-purple-700 cursor-pointer">
                <span className="material-icons">emoji_events</span>
                Achievements
              </li>
              <li className="flex items-center gap-3 text-gray-600 hover:text-purple-700 cursor-pointer">
                <span className="material-icons">settings</span>
                Settings
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-purple-700 text-white flex items-center justify-center rounded-full">
            JS
          </div>
          <div>
            <div className="font-semibold">John Smith</div>
            <div className="text-sm text-gray-600">Pro Plan</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="mb-8">
          <div className="text-purple-600 text-sm">Pro Plan • 28 days remaining</div>
          <h1 className="text-3xl font-bold">Welcome back, John!</h1>
          <p className="text-gray-600">
            Continue your learning journey where you left off.
          </p>
        </header>

        {/* Stats Section */}
        <section className="grid grid-cols-4 gap-6 mb-8">
          {[
            { label: "Learning Hours", value: "42", sub: "+3.5 hrs this week" },
            { label: "Lessons Completed", value: "28", sub: "+4 new lessons" },
            { label: "Current Streak", value: "16", sub: "days" },
            { label: "Tokens Earned", value: "3,250", sub: "+250 last week" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 text-center"
            >
              <div className="text-2xl font-bold text-black">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
              <div className="text-sm text-purple-600">{stat.sub}</div>
            </div>
          ))}
        </section>

        {/* Learning Path & Earn-to-Learn Rewards */}
        <section className="grid grid-cols-2 gap-6">
          {/* Learning Path */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Learning Path</h2>
              <button className="text-purple-600">View All</button>
            </div>
            <div className="mb-4">
              <div className="text-gray-600">Current Module</div>
              <div className="text-lg font-semibold text-black">
                Advanced Topics
              </div>
              <div className="text-sm text-purple-600">65% Complete</div>
            </div>
            <div className="relative bg-gray-200 rounded-full h-2">
              <div
                className="absolute top-0 left-0 bg-purple-700 h-2 rounded-full"
                style={{ width: "65%" }}
              ></div>
            </div>
          </div>

          {/* Earn-to-Learn Rewards */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Earn-to-Learn Rewards</h2>
              <button className="text-purple-600">Stake Tokens</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-100 p-4 rounded-lg text-center">
                <div className="text-lg font-bold text-purple-700">
                  3,250 EduTokens
                </div>
                <div className="text-sm text-gray-600">Current Balance</div>
              </div>
              <div className="bg-purple-100 p-4 rounded-lg text-center">
                <div className="text-lg font-bold text-purple-700">+15%</div>
                <div className="text-sm text-gray-600">Annual Yield</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
