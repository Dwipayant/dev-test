import { Restaurant } from "../interfaces/restaurant";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import  CustomizedRatings  from '../components/RatingComponent/CustomizedRatings';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { useAuthContext } from "../auth/authContext";
import React from "react";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
    },
    card: {
        maxWidth: 345,
      },
      media: {
        height: 140,
      },
      avatar: {
        backgroundColor: red[500],
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));


export interface RestaurantItemProps {
    restaurant: Restaurant;
}

export function RestaurantItem(props: RestaurantItemProps) {
    const { restaurant } = props;
    const { authService } = useAuthContext();
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar} >{restaurant.name.charAt(0)}</Avatar>
                        }
                        title={restaurant.name}
                        subheader={restaurant.phoneNumber}
                    />
                    <CardMedia
                        className={classes.media}
                        image={restaurant.photoUri}
                        title={restaurant.name}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {restaurant.address}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            {authService._isAuthenticated && <CustomizedRatings restaurantName={restaurant.name}/>}
                        </IconButton>
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
                <Typography paragraph>
                    {restaurant.description}
                </Typography>
                
            </CardContent>
        </Collapse>
                </Card>
            </Grid>
        </Grid>
    );
}
