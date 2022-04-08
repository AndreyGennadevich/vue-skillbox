const events = {
  goToPage: 'goToPage',
};

export default function goToPage(pageName, pageParams) {
  this.emitter.emit(events.goToPage, { pageName, pageParams });
}
