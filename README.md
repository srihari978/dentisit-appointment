Features
---------------------------------------------------------------------------------------------------------------------
         User Features

User Registration:
Users can register an account with their email and password.
Passwords are securely hashed using bcrypt before storing in the database.
            User Login:
            Users login with their email and password. The password is verified using bcrypt.
   View Doctors:
            After login, users can see a list of available doctors with details like:
Name
Qualification
Experience
Photo (optional)
-------------------------------------------------------------------------------------This is my Book Appointment
Book Appointment:
Users can select an available slot for a doctor and book an appointment.
Booked slots are marked as unavailable to prevent double booking.
--------------------------------------------------------------------------------- //This is my admin
Admin Features
            Admin login is restricted to a specific email/password combination.

Admins can:
           Add new doctors
           
Add available slots for each doctor
----------------------------------------------------------------------------------
Backend Features
       Database: PostgreSQL with tables for users, doctors, and slots.
Slot Booking:
        Once a user books a slot, the is_booked flag is updated in the database.
Security:
         Passwords are hashed using bcrypt
Only authenticated users can book appointments
---------------------------------------------------------------------------------  // THis is my Planned Features
Planned Features
              Real-time Email Integration:
                                   In the future, users will receive email notifications upon booking an appointment.
               Real-time Slot Updates:
                                    Prevents booking conflicts if multiple users try to book the same slot simultaneously.
