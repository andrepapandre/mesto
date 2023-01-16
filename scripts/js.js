function renderCard(item) {
    const cardRender = new Card(
      item,
      templateCard,
      handleCardClick,
      pictureForPopup,
      nameForPopup,
      openPopup,
      closePopupWindow
    );
    const carding = cardRender.generateCard();
    container.prepend(carding);
  }
  
  
  cardsArray.forEach((item) => {
    renderCard(item);
  });