import css from './NoteForm.module.css';
import { useId } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';
import { useNoteStore } from '@/lib/store/noteStore';
import { createNote } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';

interface NoteFormValues {
  title: string;
  content: string;
  tag: string;
}

export default function NoteForm() {
  const queryClient = useQueryClient();
  const fieldId = useId();
  const { draft, setDraft, deleteDraft } = useNoteStore();
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({
      ...draft,
      [e.target.name]: e.target.value,
    });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['note'] });
      router.back();
      deleteDraft();
    },
    onError: () => console.log('Error'),
  });

  const handleSubmit = (formData: FormData) => {
    const formValue: NoteFormValues = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: formData.get('tag') as string,
    };
    if (formValue.title.length < 3) {
      toast('Title must be at least 3 characters');
      return;
    } else if (formValue.title.length > 50) {
      toast('Title is too long');
      return;
    } else if (formValue.content.length > 500) {
      toast('Content is too long');
      return;
    }

    mutate(formValue);
  };

  return (
    <>
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <input
            defaultValue={draft?.title}
            id={`${fieldId}-title`}
            type="text"
            name="title"
            className={css.input}
            onChange={handleChange}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <textarea
            defaultValue={draft?.content}
            id={`${fieldId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
            onChange={handleChange}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <select
            defaultValue={draft?.tag}
            id={`${fieldId}-tag`}
            name="tag"
            className={css.select}
            onChange={handleChange}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </select>
        </div>

        <div className={css.actions}>
          <button
            type="button"
            onClick={() => router.back()}
            className={css.cancelButton}
          >
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            {isPending ? 'Note creating...' : 'Create note'}
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}
