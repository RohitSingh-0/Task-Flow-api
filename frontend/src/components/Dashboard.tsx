import "./Dashboard.css";
import image from "../assests/images.jpg";
import { Calendar } from "./Calendar"

export function Dashboard() {
    return (
        <div
            className="fullHW grid border bgColor mainContentBgColor"
            id="dashboard"
        >
            <aside className="whiteBgColor padding10" id="sidebar">
                <nav className="grid padding10" id="sidebarContent">
                    <div className="logoContainer">
                        <img src={image} alt="TaskFlow"></img>
                    </div>

                    <div className="navbarContainer flex">

                        <nav className="menuSection flex">

                            <div className="menuHeading">
                                MAIN MENU
                            </div>

                            <button type="button" className="sidebarItem active">
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M3 12L12 4l9 8" />
                                    <path d="M5 10v10h14V10" />
                                </svg>
                                <span>Dashboard</span>
                            </button>

                            <button type="button" className="sidebarItem">
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <rect x="4" y="4" width="16" height="16" rx="2" />
                                    <path d="M8 9h8M8 13h6M8 17h4" />
                                </svg>
                                <span>Tasks</span>
                            </button>

                            <div className="sidebarDivider"></div>

                            <div className="menuHeading generalHeading">
                                GENERAL
                            </div>

                            <button type="button" className="sidebarItem">
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <circle cx="12" cy="12" r="3" />
                                    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V20h-2.5v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1A1.7 1.7 0 0 0 8 15a1.7 1.7 0 0 0-1.6-1H6v-2.5h.4A1.7 1.7 0 0 0 8 10a1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V5h2.5v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.1V14h-.1a1.7 1.7 0 0 0-1.5 1Z" />
                                </svg>
                                <span>Settings</span>
                            </button>

                            <button type="button" className="sidebarItem">
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <circle cx="12" cy="12" r="9" />
                                    <path d="M9.5 9a2.5 2.5 0 1 1 4.1 1.9c-.9.7-1.6 1.2-1.6 2.6" />
                                    <path d="M12 17h.01" />
                                </svg>
                                <span>Help</span>
                            </button>

                        </nav>

                        <button type="button" className="logoutButton">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M10 17l5-5-5-5" />
                                <path d="M15 12H3" />
                                <path d="M21 3v18" />
                            </svg>
                            <span>Log Out</span>
                        </button>

                    </div>


                </nav>
            </aside>

            <div className="whiteBgColor grid" id="contentArea">
                <header className="dashboardHeader whiteBgColor">

                    <div className="headerGreeting">
                        <h2>Good Morning, Rohit</h2>
                        <p>Here's what's happening with your tasks</p>
                    </div>

                    <div className="headerActions">

                        <button type="button" className="searchButton" aria-label="Search">
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </button>

                        <button type="button" className="profileButton">

                            <div className="profileAvatar">
                                R
                            </div>

                            <span>Rohit</span>

                            <svg
                                className="dropdownIcon"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path d="m6 9 6 6 6-6" />
                            </svg>

                        </button>

                    </div>

                </header>
                <main className="whiteBgColor grid twoColumnsTwoRows gap10">

                    <div className="borderRadius10 recentTaskContainer border margin10">
                        <div className="recentTaskHeader">
                            <h3 className="bold600" >Recent Tasks</h3>
                            <button type="button">View All</button>
                        </div>

                        <div className="recentTaskList">

                            <div className="taskItem">
                                <div className="taskInfo">
                                    <h4>Complete Dashboard UI</h4>
                                    <p>Frontend Development</p>
                                </div>

                                <div className="taskStatus pending">
                                    Pending
                                </div>
                            </div>

                            <div className="taskItem">
                                <div className="taskInfo">
                                    <h4>Implement JWT Authentication</h4>
                                    <p>Backend Development</p>
                                </div>

                                <div className="taskStatus completed">
                                    Completed
                                </div>
                            </div>

                            <div className="taskItem">
                                <div className="taskInfo">
                                    <h4>Fix Task API Validation</h4>
                                    <p>Backend Development</p>
                                </div>

                                <div className="taskStatus running">
                                    In Progress
                                </div>
                            </div>

                            <div className="taskItem">
                                <div className="taskInfo">
                                    <h4>Update User Profile</h4>
                                    <p>Account Management</p>
                                </div>

                                <div className="taskStatus completed">
                                    Completed
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="calendarContainer border borderRadius10 margin10" >
                        <p className="bold600 padding10" >Schedule Your Task</p>
                        <Calendar />
                    </div>

                    <div className="circularContainer border borderRadius10 margin10">
                        <div id="taskProgressContainer">
                            <p className="bold600 padding10" >Tasks Progress</p>
                        </div>
                        <div className="outerCircle">
                            <div className="innerCircle">
                                <p id="fiftyPercent" className="bold600">50%</p>
                                <p className="silver" >Progress</p>
                            </div>
                        </div>
                        <div className="taskProgressDetails flex marginTop15">
                            <div className="gap8 flex justifyAlignCenter">
                                <div className="taskDetailsDia completedWheel"></div>
                                <p>Completed</p>
                            </div>

                            <div className="gap8 flex justifyAlignCenter">
                                <div className="taskDetailsDia inProgressWheel"></div>
                                <p>In Progress</p>
                            </div>

                            <div className="gap8 flex justifyAlignCenter">
                                <div className="taskDetailsDia pendingWheel"></div>
                                <p>Pending</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
