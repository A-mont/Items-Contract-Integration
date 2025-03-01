'use server';

import axios from 'axios';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { resolve } from 'path';
import { z } from 'zod';

const LoginUserForm = z.object({
    username: z.string(),
    password: z.string()
});

export const loginUser = async (formData: FormData) => {
    console.log('Data que se obtuvo');
    console.log(formData);
    const { username, password } = LoginUserForm.parse({
        username: formData.get('username'),
        password: formData.get('password')
    });

    try {
        const response = await axios.post('http://localhost:3000/keyring/login', {username, password});
        console.log(response.data);
    } catch (e) {
        console.log('ERRRRROOOOOOOOOOOR');
        console.log(e);
        return {
            message: 'error'
        }
    }

    revalidatePath('/');
    redirect('/');
};

export const sendGreen = async () => {
    try {
        const response = await axios.post('http://localhost:3000/trafficlight/green');
        return response;
    } catch (e) {
        return { error: 'Error while sending green' };
    }
}

export const sendYellow = async () => {
    try {
        const response = await axios.post('http://localhost:3000/trafficlight/yellow');
        return response;
    } catch (e) {
        return { error: 'Error while sending yellow' };
    }
}

export const sendRed = async () => {
    try {
        const response = await axios.post('http://localhost:3000/trafficlight/red');
        return response;
    } catch (e) {
        return { error: 'Error while sending red' };
    }
}