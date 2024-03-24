import './Notifications.css'; 

interface NotificationProps {
    message: string; // Specify the type of the `message` prop
  }

  const Notification: React.FC<NotificationProps> = ({ message }) => {
    if (!message) return null;
  
    return (
      <div className="alert alert-danger text-center fixed-bottom mb-3 w-25 mx-auto">
        {message}
      </div>
    );
  };
  
  export default Notification;