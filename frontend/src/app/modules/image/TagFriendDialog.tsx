import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Chip } from '@mui/material';
import { ENTER_KEY, ENTER_KEY_CODE } from 'utils/constants';
import validator from 'validator';
import { func } from 'shared/types';
import { tagImage } from './ducks/slice';
import { useAppDispatch, useAppSelector } from 'store/hooks';

interface TagFriendDialogProps {
  open: boolean;
  onClose: func;
  selectedImageId: string | null;
  taggedFriends: any[];
}

const TagFriendDialog = (props: TagFriendDialogProps) => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState('');
  const [list, setList] = useState<any[]>([]);
  const [inputError, setInputError] = useState<string | null>(null);

  useEffect(() => {
    setInputError(null);
    setList([]);
    setInputValue('');
  }, [props.open]);

  useEffect(() => {
    const taggedWith: any = props.taggedFriends.map((tg) => tg.user);
    const emailsList = taggedWith.map((user: any) => user.email);
    setList(emailsList);
  }, [props.taggedFriends]);

  const handleOnChange = (event: any) => {
    const { value } = event.target;
    setInputError(null);
    setInputValue(value);
  };

  const handleOnKeyUp = (event: any) => {
    setInputError(null);
    if (event.key === ENTER_KEY || event.which === ENTER_KEY_CODE) {
      if (validator.isEmail(inputValue)) {
        if (!list.includes(inputValue)) {
          setList([...list, inputValue]);
          setInputValue('');
        } else {
          setInputError('Email Address already entered');
        }
      } else {
        setInputError('Invalid Email Address');
      }
    }
  };

  const handleItemDelete = (index: number) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  };

  const handleTagImage = () => {
    if (list.length || props.taggedFriends.length) {
      dispatch(tagImage(props.selectedImageId || '', list, handleTagSuccess));
    } else {
      setInputError('Email Address is required');
    }
  };

  const handleTagSuccess = () => {
    props.onClose(true);
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle>Tag Friend</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To tag this image to your friend, please enter the email address of your friend.
          </DialogContentText>
          <TextField
            onChange={handleOnChange}
            onKeyUp={handleOnKeyUp}
            value={inputValue}
            autoFocus
            margin="dense"
            id="name"
            label="Enter Email Addresses"
            type="email"
            fullWidth
            variant="standard"
            error={inputError ? true : false}
            helperText={inputError ? inputError : ''}
          />
          {list.map((item, index) => (
            <Chip key={index} label={item} onDelete={() => handleItemDelete(index)} />
          ))}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={props.onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleTagImage}>
            Tag
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TagFriendDialog;
