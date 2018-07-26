// ######################
// #### This file contains styles used by several components
//#######################
export const footerText= {
    color:' white',

}

export const colors = {
    shedBlack: "#b5b5b5",
    black: "#333",
    gray: "#000000",
    teal: "#03A9F4",
    orange: "#d44d23"
  }
  export const socialButtons = {
      display : "inline-block"
  }
  export const imageResponsive ={
      display:'block',
      width: '100%',
      height: 'auto'
  }
  export const caption = {
      background: "inherit",
      width: "100%",
      margin: 0,
      boxSizing:"border-box",
      padding:0
  }
  export const thumbnail = {
      padding:0,
      margin:0,
      boxSizing:'border-box',
      width:'30%',
      display:'flex-item',
      '@media (min-width: 640px)':{

      }
  }
  export const menuBarItem = {
      display: "inline-block",
      float: "right",
      minHeight: 50,
      width: 60,
      fontColor:"white",
      ':hover':{
          background: colors.shedBlack,
          border:"1px solid black"
      }
  }
  export const homeText = {
      display:'inline-block',
      boxSizing:'border-box',
      color: 'white',
      textAlign:'center',
  }
  export const Icon = {
      background:"green",
      color:"black",
      width:" 30%",
      boxSizing:'border-box'
  }
  
  // form styles
  export const responsiveImage = {
    display: "block",
    width:"100%",
    height: "auto",
  }
  export const loginPage = {
    image: {
        ...responsiveImage,
        position: "absolute",
        ZIndex: -3,
  },
  ...cardStyles,
  background: {
      background: "url(https://source.unsplash.com/random/1366x768)",
      minWidth:750,
      minHeight:700
  }
}
export const signupPageStyle = {
    background: {
        background: "url(https://source.unsplash.com/random/1366x768)",
        minWidth:750,
        minHeight:700
    }
}
export const cardStyles= {
    
  };
  
  