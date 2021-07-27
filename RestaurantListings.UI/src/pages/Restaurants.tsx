import React, { useCallback, useEffect, useState } from "react";

import { getRestaurants } from "../api/restaurants";
import { RestaurantList } from "../components/RestaurantList";
import CreateRestaurant from '../components/CreateRestaurant/CreateRestaurant';
import {
    RestaurantFilters,
    RestaurantFiltersState,
} from "../components/RestaurantFilters";
import { Restaurant } from "../interfaces/restaurant";
import { Container,  CssBaseline,  Grid, makeStyles } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

import { useAuthContext } from "../auth/authContext";

const useStyles = makeStyles((theme) => ({
    root: {
      display:'flex',
      flex:'0 0 100%',
      justifyContent: 'flex-end'
    },
  }));
  
export function Restaurants() {
    const { authService } = useAuthContext();
    const classes = useStyles();
    const [tags, setTags] = useState<string[]>([]);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        async function fetchRestaurants() {
            const data = await getRestaurants();
            setRestaurants(data);
            setTags(data.flatMap((x) => x.tags));
        }

        fetchRestaurants();
    }, []);
const createNewRestaurant= () =>{
    setIsOpen(!isOpen);
}
    const handleFiltersChange = useCallback((value: RestaurantFiltersState) => {
        setRestaurants((nextRestaurants) => {
            if (value.tags.length) {
                value.tags.forEach((tag) => {
                    nextRestaurants = nextRestaurants.filter((r) => r.tags.includes(tag));
                });
            }

            if (value.isFamilyFriendly) {
                nextRestaurants = nextRestaurants.filter((r) => r.familyFriendly);
            }

            if (value.isVeganFriendly) {
                nextRestaurants = nextRestaurants.filter((r) => r.veganFriendly);
            }

            return nextRestaurants;
        });
    }, []);

    return (
        <React.Fragment>
            <CssBaseline />
            <Container >
                <Grid container item xs={12}>
                <Grid item xs={4} sm={3}>
                    <RestaurantFilters tags={tags} onChange={handleFiltersChange} />
                </Grid>
                <Grid container item xs={8} sm={9}>
                {authService._isAuthenticated && <div className={classes.root} onClick={()=>createNewRestaurant()}>
                    <AddIcon />Add Restaurant
                </div>}
                {isOpen && <CreateRestaurant 
                isDialogOpened={isOpen}
                handleCloseDialog={() => setIsOpen(false)}/>}
                    <RestaurantList restaurants={restaurants} />
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
}
