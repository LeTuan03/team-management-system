import { useTheme } from "@mui/material/styles";

export const Logo = () => {
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;

  return (
    // <svg
    //   class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-18wq8ra"
    //   focusable="false"
    //   aria-hidden="true"
    //   viewBox="0 0 24 24"
    //   data-testid="SportsSoccerIcon"
    //   tabindex="-1"
    //   title="SportsSoccer"
    // >
    //   <path
    //     fill={fillColor}
    //     d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 3.3 1.35-.95c1.82.56 3.37 1.76 4.38 3.34l-.39 1.34-1.35.46L13 6.7zm-3.35-.95L11 5.3v1.4L7.01 9.49l-1.35-.46-.39-1.34c1.01-1.57 2.56-2.77 4.38-3.34M7.08 17.11l-1.14.1C4.73 15.81 4 13.99 4 12c0-.12.01-.23.02-.35l1-.73 1.38.48 1.46 4.34zm7.42 2.48c-.79.26-1.63.41-2.5.41s-1.71-.15-2.5-.41l-.69-1.49.64-1.1h5.11l.64 1.11zM14.27 15H9.73l-1.35-4.02L12 8.44l3.63 2.54zm3.79 2.21-1.14-.1-.79-1.37 1.46-4.34 1.39-.47 1 .73c.01.11.02.22.02.34 0 1.99-.73 3.81-1.94 5.21"
    //   ></path>
    // </svg>

    <img
      className="scale-4"
      src="https://png.pngtree.com/png-clipart/20231214/ourmid/pngtree-world-cup-black-and-white-cartoon-football-banner-border-png-image_11332813.png"
    />
  );
};
