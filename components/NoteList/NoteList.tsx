import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Note } from '../../types/note';
import css from './NoteList.module.css';
import Link from 'next/link';
import { deleteNote } from '@/lib/api/clientApi';

interface NoteListProps {
  notes: Note[];
}

export function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['note'] }),
  });

  console.log(notes);

  return (
    <>
      <ul className={css.list}>
        {notes.map(note => (
          <li className={css.listItem} key={note._id}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <Link href={`/notes/${note._id}`}>View details</Link>
              <button className={css.button} onClick={() => mutate(note._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
