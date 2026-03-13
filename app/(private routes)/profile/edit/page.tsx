'use client';

import Image from 'next/image';
import css from './EditProfilePage.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { getMe, updateMe } from '@/lib/api/clientApi';
import { useState } from 'react';

export default function EditProfile() {
  const { user, setUser } = useAuthStore();
  const router = useRouter();
  const [error, setError] = useState('');

  const handleUpdateUsername = async (formData: FormData) => {
    try {
      const user = await getMe();
      const newUsername = formData.get('username') as string;
      console.log(newUsername);
      if (user) {
        const updateUser = {
          ...user,
          username: newUsername,
        };

        await updateMe({ username: newUsername });
        setUser({ ...updateUser });
        router.push('/profile');
      }
    } catch {
      setError('Failed to update profile');
    }
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src="https://ac.goit.global/fullstack/react/default-avatar.jpg"
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} action={handleUpdateUsername}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              name="username"
              id="username"
              type="text"
              className={css.input}
              defaultValue={user?.username}
            />
          </div>

          <p>{`Email: ${user?.email}`}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
