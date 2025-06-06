import { Inngest } from "inngest";
import connectDB from "./db";
import inngest from '../../config/inngest'

// Create a client to send and receive events
export const inngest = new Inngest({ id: "ADERTECH-next" });

// inngest function to save user data to the database

export const saveUser = inngest.createFunction(
    {
        id: 'sync-user-from-clerk'
    },
    {
        event: 'clerk.user.created',
    },
    async ({ event }) => {
        const { id, first_name, last_name,email_addresses, image_url } = event.data;
        const userData = {
            _id: id,
            email: email_addresses[0].email_address, 
            name: first_name + " " + last_name,
            imageUrl: image_url,   
        }
        await User.create(userData)
        await User.create(userData)
    }
)

// Inngest function to update user data in the database
export const updateUser = inngest.createFunction(
    {id: 'update-user-from-clerk'},
    {
        event: 'clerk/user.updated',
    },
    async ({even}) => {
        const { id, first_name, last_name,email_addresses, image_url } = event.data;
        const userData = {
            _id: id,
            email: email_addresses[0].email_address, 
            name: first_name + " " + last_name,
            imageUrl: image_url,   
        }
        await connectDB()
        await User.findIDAndUpdate(id, userData)
    }
)

// Inngest function to delete user data from the database

export const syncUserDeletion = inngest.createFunction(
    {
        id : 'delete-user-from-clerk'
    },
    {
        event: 'clerk/user.deleted',
    },async ({event}) => {
        const {id} = event.data;

        await connectDB()
        await User.findByIdAndDelete(id)
    }
)