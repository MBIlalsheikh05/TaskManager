import React from "react";
import { useNavigate } from "react-router-dom"; 
import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import { FaNewspaper, FaUsers } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import moment from "moment";
import clsx from "clsx";

// Mock Data (Replace with your real data)
const summary = {
  totalTasks: 100,
  tasks: {
    completed: 30,
    "in progress": 50,
    todo: 20,
  },
  last10Task: [
    { title: "Task 1", priority: "high", team: ["User A"], date: new Date(), stage: "completed" },
    { title: "Task 2", priority: "medium", team: ["User B", "User C"], date: new Date(), stage: "in progress" },
    // Add more tasks as needed
  ],
  users: [
    { name: "M Bilal Sheikh", role: "Admin", isActive: true, createdAt: new Date() },
    { name: "Taha Sheikh", role: "User", isActive: false, createdAt: new Date() },
    // Add more users as needed
  ],
};

// Mock Chart and UserInfo Components (Replace with real components)
const Chart = () => <div className="h-48 bg-gray-200">Chart Component</div>;

const TaskTable = ({ tasks }) => {
  const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };

  return (
    <div className="w-full md:w-2/3 bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded">
      <table className="w-full">
        <thead className="border-b border-gray-300 ">
          <tr className="text-black text-left">
            <th className="py-2">Task Title</th>
            <th className="py-2">Priority</th>
            <th className="py-2">Team</th>
            <th className="py-2 hidden md:block">Created At</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map((task, id) => (
            <tr key={id} className="border-b border-gray-300 text-gray-600 hover:bg-gray-300/10">
              <td className="py-2">{task.title}</td>
              <td className="py-2">
                <div className="flex gap-1 items-center">
                  <span className={clsx("text-lg", ICONS[task.priority])}>
                    {ICONS[task.priority]}
                  </span>
                  <span className="capitalize">{task.priority}</span>
                </div>
              </td>
              <td className="py-2">{task.team.join(", ")}</td>
              <td className="py-2 hidden md:block">{moment(task.date).fromNow()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const UserTable = ({ users }) => (
  <div className="w-full md:w-1/3 bg-white h-fit px-2 md:px-6 py-4 shadow-md rounded">
    <table className="w-full mb-5">
      <thead className="border-b border-gray-300 ">
        <tr className="text-black text-left">
          <th className="py-2">Full Name</th>
          <th className="py-2">Status</th>
          <th className="py-2">Created At</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user, index) => (
          <tr key={index} className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
            <td className="py-2">{user.name}</td>
            <td>
              <p className={clsx("w-fit px-3 py-1 rounded-full text-sm", user.isActive ? "bg-blue-200" : "bg-yellow-100")}>
                {user.isActive ? "Active" : "Disabled"}
              </p>
            </td>
            <td className="py-2 text-sm">{moment(user.createdAt).fromNow()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();

  // Remove the useEffect that checks for user login
  // const isUserLoggedIn = localStorage.getItem("user");
  // if (!isUserLoggedIn) {
  //   navigate("/login");
  // }

  const totals = summary.tasks;

  const stats = [
    { label: "TOTAL TASK", total: summary.totalTasks, icon: <FaNewspaper />, bg: "bg-[#1d4ed8]" },
    { label: "COMPLETED TASK", total: totals["completed"], icon: <MdAdminPanelSettings />, bg: "bg-[#0f766e]" },
    { label: "TASK IN PROGRESS", total: totals["in progress"], icon: <LuClipboardEdit />, bg: "bg-[#f59e0b]" },
    { label: "TODOS", total: totals["todo"], icon: <FaArrowsToDot />, bg: "bg-[#be185d]" },
  ];

  return (
    <div className="h-full py-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {stats.map((stat, index) => (
          <div key={index} className="w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between">
            <div className="h-full flex flex-1 flex-col justify-between">
              <p className="text-base text-gray-600">{stat.label}</p>
              <span className="text-2xl font-semibold">{stat.total}</span>
              <span className="text-sm text-gray-400">{"110 last month"}</span>
            </div>
            <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center text-white", stat.bg)}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full bg-white my-16 p-4 rounded shadow-sm">
        <h4 className="text-xl text-gray-600 font-semibold">Chart by Priority</h4>
        <Chart />
      </div>

      <div className="w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8">
        <TaskTable tasks={summary.last10Task} />
        <UserTable users={summary.users} />
      </div>
    </div>
  );
};

export default Dashboard;
