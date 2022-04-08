
export default function goToPage(pageName, pageParams) {
  this.emitter.emit('goToPage', { pageName, pageParams });
}
