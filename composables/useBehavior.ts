export const useBehavior = () => {
  // "A Tarnished, waiting for grace" - track the scroll state
  const scroll = ref(false);

  // "Survey the lands" - function to check scroll position
  function checkScroll(e: Event) {
    const target = e.target as HTMLElement;
    target.scrollTop === 0 ? (scroll.value = false) : (scroll.value = true);
  }

  // "Forging the menu" - interface for menu items
  interface menuItems {
    activate?: boolean;
    title: string;
    icon?: string;
    to?: string;
    child?: Array<{
      title?: string;
      icon?: string;
      text?: string;
      to?: string;
      color?: string;
    }>;
  }

  // "The Great Runes" - defining the structure and content of menu items

  return {
    scroll,
    checkScroll,
  };
};
