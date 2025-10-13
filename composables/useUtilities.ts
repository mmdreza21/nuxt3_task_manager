export const useUtilities = () => {
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

  const menuItems: Ref<menuItems[]> = ref([
    { title: "Task Manager", to: "/" },
    { title: "Chat", to: "/chat" },
  ]);

  return {
    menuItems,
  };
};
