Life RPG is a full-stack productivity website that turns everyday tasks into RPG-style quests. Instead of using a normal to-do list, users become “Hunters” and complete real-life quests to earn XP and Coins.

The main purpose of Life RPG is to make productivity more interesting and motivating. When a user completes a task, they immediately receive rewards, gain experience, increase their level, and unlock achievements.

The website starts with a Login and Registration system. A new user can create an account using a username, email, and password. Existing users can log in to their account. Authentication is handled using JWT, while passwords are securely hashed using bcrypt.

After logging in, the user enters the main Hunter Dashboard. The dashboard displays important information such as the user's name, Hunter rank, current level, XP, Coins, streak, and completed quests.

The main feature of the website is the Quest System. Users can create their own quests based on their real-life activities. For example, a user can create quests such as “Study JavaScript for 2 hours,” “Complete 50 DSA questions,” “Go for a run,” or “Read 20 pages.”

Every quest has a category, difficulty level, XP reward, and Coin reward.

The available categories include Study, Fitness, Reading, Work, Personal, and Other.

The quests have three difficulty levels: Easy, Medium, and Hard. Higher-difficulty quests provide higher rewards. This creates an RPG-style progression system where more challenging tasks provide greater benefits.

When a user completes a quest, the backend verifies that the quest belongs to that user and has not already been completed. The system then adds the appropriate XP and Coins to the user's account and updates their level.

The XP system is used to determine the user's level. As the user earns more XP, their level increases. For example, reaching 100 XP moves the user to Level 2, 200 XP moves them to Level 3, and so on.

Coins work as the website's virtual currency. Users earn Coins by completing quests. These Coins can be used in the Reward System to represent rewards such as a gaming session, movie night, coffee break, pizza, music session, or free time.

The website also contains an Achievement System. Achievements provide additional goals for the user. Examples include completing the first quest, reaching a seven-day streak, earning 1,000 XP, reaching Level 25, clearing 50 quests, and reaching Level 50.

The Hunter Profile provides an overview of the user's progress. It displays information such as the Hunter name, rank, level, XP, Coins, streak, and completed quests.

The website also has a Quest History system. Whenever a quest is completed, information about that completed quest, the XP earned, Coins earned, and completion time can be stored in the database.

The interface is designed like a futuristic RPG system. It uses a dark background, blue and cyan glowing elements, angular borders, system notifications, futuristic fonts, XP bars, and animated quest-completion screens.

When a quest is completed, the website displays a System Notification. It shows that the quest has been completed and displays the XP and Coins earned. If the user levels up, the system can also display a Level Up notification.

The technical architecture of the project consists of a React frontend, Node.js and Express backend, and MongoDB Atlas database.

The frontend communicates with the backend through REST APIs. Axios is used to send requests from the React application to the backend.

The backend handles authentication, user information, quest creation, quest completion, XP calculation, Coin calculation, and quest history.

MongoDB stores the user's account information, quests, and quest completion history.

The overall working of the application can be explained simply as:

User registers or logs in.

The user creates a real-life quest.

The quest is stored in the database.

The user completes the quest.

The backend verifies the quest.

The user receives XP and Coins.

The user's level is updated.

The completion is stored in quest history.

The system displays a futuristic completion notification.

The user continues creating and completing new quests.

The main concept of Life RPG is therefore:

Real-Life Task → Quest → Completion → XP + Coins → Level Up → Achievements → Rewards

The project solves a common problem with traditional productivity applications: completing a task often does not provide an immediate sense of achievement. Life RPG provides immediate feedback through XP, Coins, levels, achievements, and visual system notifications.

In one sentence:

Life RPG is a gamified productivity platform that transforms real-life goals and tasks into RPG quests, rewarding users with XP, Coins, levels, achievements, and rewards to make productivity more engaging and motivating.
