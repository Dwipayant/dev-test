import { makeStyles } from "@material-ui/core";
import React from "react";

import { Restaurant } from "../interfaces/restaurant";
import SearchBar from "./Filters/SearchBar";
import { RestaurantItem } from "./RestaurantItem";

export interface RestaurantListProps {
    restaurants?: Restaurant[];
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(45),
            height: theme.spacing(80),
        },
    },
    card: {
        maxWidth: 345,
      },
      media: {
        height: 140,
      }
    
}));

export function RestaurantList(props: RestaurantListProps) {
    const { restaurants = [] } = props;
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {
               restaurants.map((restaurant) => (
                <RestaurantItem restaurant={restaurant} />
             ))
            }
        </div>
    );
}
