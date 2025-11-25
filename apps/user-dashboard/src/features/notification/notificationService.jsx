import * as crudService from '../../services/crudService';

export const fetchNotifications = () => crudService.getAll('/notifications');

export const markAllNotificationsRead = () => crudService.getAll('/notifications/allAsRead');
