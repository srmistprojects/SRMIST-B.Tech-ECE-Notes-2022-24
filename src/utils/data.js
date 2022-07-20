/**
 * Fetch In app data Utils
 */

// Dependencies
import allNotifications from '../data/notifications.json';
import allSemesters from '../data/semesters.json';
import semester1 from '../data/semesters/semester1.json';
import semester2 from '../data/semesters/semester2.json';
import semester3 from '../data/semesters/semester3.json';
import semester4 from '../data/semesters/semester4.json';
import semester5 from '../data/semesters/semester5.json';
import semester6 from '../data/semesters/semester6.json';
import semester7 from '../data/semesters/semester7.json';
import semester8 from '../data/semesters/semester8.json';

// Get Read Notifications from Local Storage, parse it if it's there
// If not there, then return an empty array.
const readNotifications = localStorage.getItem('readNotifications') ? JSON.parse(localStorage.getItem('readNotifications')) : [];
const coursesOfSems = {
    semester1,
    semester2,
    semester3,
    semester4,
    semester5,
    semester6,
    semester7,
    semester8,
}

/**
 * Data Utility Class
 */
class Data {
    static get Notification() {
        const notificationUtils = {};

        /**
         * @description Compares read notifications and new notifications, 
         * returns true if already read and false if not for *read* property.
         * @returns {array} Array of All notifications
         */
        notificationUtils.getAllNotification = async () => {
            try {
                allNotifications.forEach((notification) => {
                    notification.read = false;
                    if (readNotifications.find((readNotification) => readNotification.id === notification.id)) {
                        notification.read = true;
                    };
                })
                return allNotifications;
            } catch (error) {
                return Promise.reject(error);
            }
        }

        /**
         * @description Update notification as read using notification Id
         * @param {string} notificationId notification Id to be added to read notifications
         * @returns {string} 'Notification marked as read!'
         */
        notificationUtils.updateReadNotifications = async (notificationId = '') => {
            try {
                const readNotification = allNotifications.find(notification => notification.id === notificationId);
                if (!readNotification) throw new Error('Notification with give Id does not exist!')
                readNotification.read = true;
                readNotifications.push(readNotification);
                localStorage.setItem('readNotifications', JSON.stringify(readNotifications));
                return 'Notification marked as read!';
            } catch (error) {
                return Promise.reject(error);
            }
        }

        return notificationUtils;
    }

    static get Semesters() {
        const semestersUtility = {};

        /**
         * @description get all semester information as an array of objects
         * @returns {array} Array of all Semester Information
         */
        semestersUtility.getAllSemesters = async () => {
            return allSemesters;
        };

        /**
         * @description Get all courses of a particular semester using Sem Name
         * @param {string} semName 
         * @returns {array} Array of courses of the sem requested
         */
        semestersUtility.getCoursesOfSemester = async (semName) => {
            return coursesOfSems[semName];
        };

        return semestersUtility;
    }
}

export default Data;