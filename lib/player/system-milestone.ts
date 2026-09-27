export function shouldRecordIdentityCompletion(previousCompleted: boolean, transitionedToCompleted: boolean): boolean {
  return previousCompleted === false && transitionedToCompleted === true;
}
