import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { deletePost } from '@/lib/actions/deletePost';

type DeletePostProps = {
  postId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};
export default function DeletePostDialog({ postId, isOpen, onOpenChange }: DeletePostProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>記事の削除</AlertDialogTitle>
          <AlertDialogDescription>この記事を削除してもいい？ </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <AlertDialogAction onClick={() => deletePost(postId)} variant="destructive">
            削除
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
