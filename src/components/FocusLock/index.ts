import { useCallback, useEffect, useRef, cloneElement, ReactElement, Dispatch, SetStateAction } from "react";
import { useActiveElement } from "../../hooks";

export interface FocusLockProps {
  locked: boolean | undefined;
  focusLastOnUnlock: boolean | undefined;
  initialIndex?: number | undefined;
  children: ReactElement;
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};


const FOCUSABLE_ELEMENTS = [
  "button:not([disabled]):not([aria-hidden])",
];

const focusableElementDomString = FOCUSABLE_ELEMENTS.join(", ");


function FocusLock({
  locked,
  focusLastOnUnlock,
  children,
  initialIndex = 0,
  open,
  setIsOpen,
}: FocusLockProps) {
  const focusRef = useRef<HTMLDivElement | null>(null);
  const currentFocusIndex = useRef<number | null>(null);
  const countIndex = useRef<number | null>(null);
  const focusedElBeforeOpen = useRef(useActiveElement() as HTMLElement);
  const focusLastOnUnlockRef = useRef(focusLastOnUnlock);
  const initialIndexRef = useRef(initialIndex);

  useEffect(() => {
    // Remove focus from menu trigger element
    if (
      locked &&
      focusRef.current &&
      focusedElBeforeOpen &&
      !focusRef.current.contains(focusedElBeforeOpen.current)
    ) {
      focusedElBeforeOpen.current?.blur();
    }

    // Add focus to first child element with attribute of focusIndex
    if (!focusRef.current) return;
    const focusableEls: HTMLElement[] = Array.from(
      focusRef.current.querySelectorAll(focusableElementDomString)

    );
    currentFocusIndex.current = initialIndexRef.current;
    focusableEls[initialIndexRef.current].focus();
  }, [open, locked]);

  useEffect(() => {
    focusLastOnUnlockRef.current = focusLastOnUnlock;
  }, [focusLastOnUnlock]);

  useEffect(() => {
    let lastFocusedElement: HTMLElement;

    if (
      locked &&
      focusRef.current &&
      focusedElBeforeOpen &&
      !focusRef.current.contains(focusedElBeforeOpen.current)
    ) {
      lastFocusedElement = focusedElBeforeOpen.current;
      lastFocusedElement.blur();
    }
    return () => {
      // Return focus to trigger element when menu is closed.
      if (focusLastOnUnlockRef.current && locked && lastFocusedElement) {
        lastFocusedElement.focus();
      }
    };
  }, [locked]);

  useEffect(() => {
    const disableArrowScroll = (event: KeyboardEvent): void => {
      if (open && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", disableArrowScroll);

    return (): void =>
      document.removeEventListener("keydown", disableArrowScroll);
  }, [open]);

  useEffect(() => {
    const closeWithTabAndESc = (event: KeyboardEvent): void => {
      if (open && (event.key === "Tab" || event.key === "Escape")) {
        event.preventDefault();
        setIsOpen
      }
    };

    document.addEventListener("keydown", closeWithTabAndESc);

    return (): void =>
      document.removeEventListener("keydown", closeWithTabAndESc);
  }, [open]);

  const handleUserKeyPress = useCallback((event: KeyboardEvent) => {
    // Get all targeted elements
    if (!focusRef.current) return;
    const focusableEls: HTMLElement[] = Array.from(
      focusRef.current.querySelectorAll(focusableElementDomString)
    );

    const { key } = event;

    // Prinfocusle Keys
    if (/[a-zA-Z0-9./<>?;:"'`!@#$%^&*()\\[\]{}_+=|\\-~,]/.test(key)) {
      let alphabetArray: Array<number> = [];

      // Create a focusable value that initializes as the currentFocusIndex value
      countIndex.current = initialIndex;

      // Get the first letter of elements that matches the pressed key
      focusableEls.filter((elem, idx) => {
        if (
          elem?.textContent?.toLowerCase().charAt(0) === key.toLowerCase() ||
          elem?.getAttribute("aria-label")?.toLowerCase().charAt(0) ===
            key.toLowerCase()
        ) {
          alphabetArray.push(idx);
        }
      });

      // Move focus to target elements
      const moveFocus = (initialIndex: number): void => {
        focusableEls[alphabetArray[initialIndex]].focus();
      };

      if (alphabetArray.length <= 0) return;
      if (alphabetArray.length > 0 && initialIndexRef.current !== null) {
        if (
          document.activeElement?.textContent?.toLowerCase().charAt(0) ===
            key.toLowerCase() ||
          document.activeElement
            ?.getAttribute("aria-label")
            ?.toLowerCase()
            .charAt(0) === key.toLowerCase()
        ) {
          if (
            document.activeElement ===
            focusableEls[alphabetArray[alphabetArray.length - 1]]
          ) {
            initialIndexRef.current = 0;
            moveFocus(0);
          } else {
            initialIndexRef.current += 1;
            moveFocus(initialIndexRef.current);
          }
        } else {
          initialIndexRef.current = 0;
          moveFocus(initialIndexRef.current);
        }
        currentFocusIndex.current = alphabetArray[initialIndexRef.current];
      }
    }
  }, [initialIndex]);

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  const lockFocus = useCallback(
    (event: KeyboardEvent) => {
      if (!locked || !focusRef.current) return;

      // Get all children element with attribute of focusIndex
      const focusableEls = Array.from(
        focusRef.current.querySelectorAll(focusableElementDomString)
      ) as HTMLElement[];

      // Handles moving the focus between menu items
      const moveFocus = (itemIndex: number): void => {
        currentFocusIndex.current = itemIndex;
        focusableEls[itemIndex].focus();
      };

      const { key } = event;
      console.log(children)

      // Create mufocusle value that initializes as the currentFocusIndex value
      let newFocusIndex: number | null = currentFocusIndex.current;

      // Handle keyboard controls\
      if (["Enter", "ArrowUp", "ArrowDown", "Home", "End"].includes(key)) {
        // Controls the current index to focus
        if (newFocusIndex !== null) {
          if (key === "focus") return;
          if (key === "ArrowUp") {
            newFocusIndex -= 1;
          } else if (key === "ArrowDown") {
            newFocusIndex += 1;
          }

          if (newFocusIndex > focusableEls.length - 1 || key === "Home") {
            newFocusIndex = 0;
          } else if (newFocusIndex < 0 || key === "End") {
            newFocusIndex = focusableEls.length - 1;
          }
        }

        // After any modification set state to the modified value
        if (newFocusIndex !== null) {
          moveFocus(newFocusIndex);
        }
        return;
      }
    },
    [locked]
  );

  useEffect(() => {
    document.addEventListener("keydown", lockFocus);
    return () => {
      document.removeEventListener("keydown", lockFocus);
    };
  }, [lockFocus]);


  return cloneElement(children, {ref: focusRef});
}

export default FocusLock;