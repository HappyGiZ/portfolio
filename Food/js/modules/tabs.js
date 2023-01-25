function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  // Tabs

  let
    tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector);

  // скрыть контент каждого таба
  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

    // убрать активность с каждого таба
    tabs.forEach(item => {
      item.classList.remove(activeClass);
    });
  }

  // сделать активным и показать контент
  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();

  // обработчик событий по табам
  tabsParent.addEventListener('click', function (event) {
    const target = event.target;
    // если target содержит класс 
    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, i) => {
        if (target == item) {
          // скрыть весь контент
          hideTabContent();
          // показать контент выделенного таба
          showTabContent(i);
        }
      });
    }
  });
}

export default tabs;