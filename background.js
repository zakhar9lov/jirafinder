browser.menus.create({
  id: "copy-subject",
  title: "Find in Jira",
  contexts: ["message_list"], 
});

browser.menus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "copy-subject") {
    let messages = await browser.mailTabs.getSelectedMessages();
    if (messages.messages.length > 0) {
      let subject = messages.messages[0].subject; 

      await navigator.clipboard.writeText(subject);
      console.log(`Copied subject: ${subject}`);

      const jiraUrl = `https://support24.team/issues/?jql=text ~ "${encodeURIComponent(subject)}" ORDER BY created DESC, status ASC`;
      browser.tabs.create({ url: jiraUrl });

    } else {
      console.warn("No message selected.");
    }
  }
});
