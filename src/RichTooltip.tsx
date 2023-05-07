import {
  ClickAwayListener,
  Fade,
  makeStyles,
  Paper,
  Popper,
  PopperPlacementType
} from "@material-ui/core";
import React, { ReactElement } from "react";
import { styled } from "@mui/material/styles";
import "./styles.css";

interface Props {
  anchorEl: ReactElement;
  content: ReactElement;
  children: ReactElement;
  open: boolean;
  onClose?: () => void;
  arrow?: boolean;
  placement?: PopperPlacementType;
  right?: string;
}

const StyledDiv = styled("div")(({ theme }) => ({
  border: "3px solid",
  borderColor: "#f08080",
  borderRadius: "16px",
  margin: theme.spacing(0)
}));

const useStyles = makeStyles((theme) => {
  const color = theme.palette.background.paper; // Feel free to customise this like they do in Tooltip
  return {
    popoverRoot: {
      borderRadius: "16px",
      backgroundColor: color
    },
    content: {
      padding: theme.spacing(3),
      textAlign: "center"
    },
    // Stolen from https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/Tooltip/Tooltip.js and https://github.com/mui-org/material-ui/blob/4f2a07e140c954b478a6670c009c23a59ec3e2d4/docs/src/pages/components/popper/ScrollPlayground.js
    popper: {
      zIndex: 2000,
      maxWidth: 320,
      marginLeft: "6rem",
      '&[x-placement*="bottom"] $arrow': {
        top: 0,
        left: 0,
        marginTop: "-0.71em",
        marginLeft: 4,
        marginRight: 4,
        "&::before": {
          transformOrigin: "0 100%"
        }
      },
      '&[x-placement*="top"] $arrow': {
        bottom: 0,
        left: 0,
        marginBottom: "-0.71em",
        marginLeft: 4,
        marginRight: 4,
        "&::before": {
          transformOrigin: "100% 0"
        }
      },
      '&[x-placement*="right"] $arrow': {
        left: 0,
        //marginLeft: "-4.71em",
        width: "0.71em",
        marginTop: 4,
        marginBottom: 4,
        "&::before": {
          transformOrigin: "100% 100%"
        }
      },
      '&[x-placement*="left"] $arrow': {
        right: 0,
        marginRight: "-0.71em",
        width: "0.71em",
        marginTop: 4,
        marginBottom: 4,
        "&::before": {
          transformOrigin: "0 0"
        }
      }
    },
    // Stolen from https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/Tooltip/Tooltip.js
    arrow: {
      //overflow: "hidden",
      position: "absolute",
      //width: "30px",
      height: "3px" /* = width / sqrt(2) = (length of the hypotenuse) */,
      boxSizing: "border-box",
      color: "#f08080",
      "&::before": {
        content: '""',
        marginLeft: "-5.71em",
        //margin: "auto",
        display: "block",
        width: "90px",
        height: "100%",
        boxShadow: theme.shadows[1],
        backgroundColor: "currentColor"
      }
    }
  };
});

const RichTooltip = ({
  anchorEl,
  placement = "top",
  arrow = true,
  open,
  onClose = () => {},
  content,
  bottom = "0px",
  right = "0px"
}: Props) => {
  const classes = useStyles();
  const [arrowRef, setArrowRef] = React.useState<HTMLElement | null>(null);
  const [childNode, setChildNode] = React.useState<HTMLElement | null>(null);

  return (
    <div>
      <Popper
        open={open}
        // style={{
        //   position: "relative",
        //   //bottom: bottom,
        //   right: "unset",
        //   top: "unset",
        //   marginLeft: "6rem",
        //   //left: right
        // }}
        anchorEl={anchorEl}
        placement={placement}
        transition
        className={classes.popper}
        modifiers={{
          preventOverflow: {
            enabled: true,
            boundariesElement: "window"
          },
          arrow: {
            enabled: arrow,
            element: arrowRef
          }
        }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper className={classes.popoverRoot}>
              <ClickAwayListener onClickAway={onClose}>
                <Paper className={classes.popoverRoot}>
                  {arrow ? (
                    <span className={classes.arrow} ref={setArrowRef} />
                  ) : null}
                  <StyledDiv className={classes.content}>{content}</StyledDiv>
                </Paper>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
};

export default RichTooltip;
