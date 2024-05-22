AFRAME.registerComponent("tour", {
    schema: {
      state: { type: "string", default: "places-list" },
      selectedCard: { type: "string", default: "#card1" },
      zoomAspectRatio: { type: "number", default: 1 }
    },
    init: function() {
      this.placesContainer = this.el;
      this.cameraEl = document.querySelector("#camera");
      this.createPlaces();
    },
    update: function() {
      window.addEventListener("keydown", e => {
        if (e.key === "ArrowUp") {
          if (
            (this.data.zoomAspectRatio <= 10 ) 
          ) {
            this.data.zoomAspectRatio += 0.002;
            this.cameraEl.setAttribute("zoom", this.data.zoomAspectRatio);
          }
        }
        if (e.key === "ArrowDown") {
          if (
            (this.data.zoomAspectRatio > 1 )
          ) {
            this.data.zoomAspectRatio -= 0.002;
            this.cameraEl.setAttribute("zoom", this.data.zoomAspectRatio);
          }
        }
      });
    },
    tick: function() {
      const { state } = this.el.getAttribute("tour");
  
      if (state === "view") {
        this.hideEl([this.placesContainer]);
        this.showView();
      }
    },
    hideEl: function(elList) {
      elList.map(el => {
        el.setAttribute("visible", false);
      });
    },
    showView: function() {
      const { selectedCard } = this.data;
      const skyEl = document.querySelector("#main-container");
      skyEl.setAttribute("material", {
        src: `./assets/360_images/${selectedCard}/place-0.jpg`,
        color: "#fff"
      });
    },
    createPlaces: function() {
      
      const thumbNailsRef = [
        {
          id: "place1home",
          title: "Home",
          url: "./outerview1.jpg"
        },
        {
          id: "place2lawn",
          title: "Lawn",
          url: "./outerview2.jpg"
        },
  
        {
          id: "place3hotel",
          title: "Hotel",
          url: "./outerview3.jpg"
        },
        {
          id: "place4flats",
          title: "Apartments",
          url: "./outerview4.jpg"
        },
        {
            id: "place5school",
            title: "School",
            url: "./outerview5.jpg"
          }
      ];
      let prevoiusXPosition = -60;
      for (var item of thumbNailsRef) {
        const posX = prevoiusXPosition + 25;
        const posY = 10;
        const posZ = -40;
        const position = { x: posX, y: posY, z: posZ };
        prevoiusXPosition = posX;
  
        // Border Element
        const borderEl = this.createBorder(position, item.id);
  
        // Thubnail Element
        const thumbNail = this.createThumbNail(item);
        borderEl.appendChild(thumbNail);
  
        // Title Text Element
        const titleEl = this.createTitleEl(position, item);
        borderEl.appendChild(titleEl);
  
        this.placesContainer.appendChild(borderEl);
      }
    },
    createThumbNail: function(item) {
      const entityEl = document.createElement("a-entity");
      entityEl.setAttribute("visible", true);
      entityEl.setAttribute("geometry", {
        primitive: "circle",
        radius: 9
      });
      entityEl.setAttribute("material", { src: item.url });
      entityEl.setAttribute("cursor-listener", {});
      return entityEl;
    },
    createTitleEl: function(position, item) {
      const entityEl = document.createElement("a-entity");
      entityEl.setAttribute("text", {
        font: "exo2bold",
        align: "center",
        width: 60,
        color: "#e65100",
        value: item.title
      });
      const elPosition = position;
      elPosition.y = -20;
      entityEl.setAttribute("position", elPosition);
      entityEl.setAttribute("visible", true);
      return entityEl;
    }, 
    
  });
  