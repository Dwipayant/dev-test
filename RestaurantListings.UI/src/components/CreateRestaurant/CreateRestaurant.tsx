import { Checkbox, FormControlLabel } from "@material-ui/core";
import { Button,  Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { CreateNewRestaurant } from "../../api/restaurants";

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 400,
      },
    },
  }));
export default function CreateRestaurant(props:any) {
    const classes = useStyles();
    //const [value, setValue] = useState('Controlled');
    const [state, setState] = useState({ RestaurantName: "", phoneNumber: "", Description:"" ,Address:"",veganFriendly:"",familyFriendly:""});

    const handleClose = () => {
        props.handleCloseDialog(false);
      };
      
      const handleChange = (event:any) => {
        const {name, value } = event.target;
        setState(state => ({ ...state, [name]: value }));
      };

      const handleChangeCheckBox = (event:any) =>{
        const {name, checked } = event.target;
        setState(state => ({ ...state, [name]: checked }));
      }

      const handleSave=async ()=>{
            const data = await CreateNewRestaurant(state);
            console.log(data);
      }

    return (
        <React.Fragment>
        <Dialog open={props.isDialogOpened} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add New Restaurant</DialogTitle>
        <DialogContent>
        <form className={classes.root} noValidate autoComplete="off">
            <div>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                name="RestaurantName"
                value={state.RestaurantName}
                onChange={handleChange}
            />
            <TextField
                id="descr"
                name="Description"
                label="Description"
                multiline
                defaultValue=""
                onChange={handleChange}
        />
            </div>
            <div>
            <TextField
                autoFocus
                margin="dense"
                name="phoneNumber"
                id="name"
                label="phoneNumber"
                type="number"
                fullWidth
                onChange={handleChange}
            />
            <TextField
                id="standard-textarea"
                label="Address"
                name="Address"
                multiline
                defaultValue=""
                onChange={handleChange}
        />
            </div>
            <div>
            <FormControlLabel
                control={
                <Checkbox
                    name="veganFriendly"
                    color="primary"
                    onChange={handleChangeCheckBox}
                />
                }
                label="Vegan Friendly"
                
            />
           <FormControlLabel
                control={
                <Checkbox
                    name="familyFriendly"
                    color="primary"
                    onChange={handleChangeCheckBox}
                />
                }
                label="Family Friendly"
         />
            </div>
           
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
        </React.Fragment>
    );
}