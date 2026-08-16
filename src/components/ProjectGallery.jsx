import { useState } from 'react';
import styled from 'styled-components';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons.jsx';

const Wrap = styled.figure`
  margin: 0;
  border-radius: ${({ theme }) => theme.radiusLg};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`;

const Viewport = styled.div`
  position: relative;
  overflow: hidden;
  background: #ffffff;
  /* A fixed frame ratio means every image in the gallery sits inside
     the same shape, rather than shorter, wider images being stretched
     tall by a taller sibling and left hanging at the top of the gap. */
  aspect-ratio: 4 / 3;
`;

const Track = styled.div`
  display: flex;
  height: 100%;
  transform: translateX(-${({ $index }) => $index * 100}%);
  transition: transform var(--dur-normal) var(--ease);
`;

const Slide = styled.div`
  flex: 0 0 100%;
  height: 100%;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    display: block;
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    border-radius: 4px;
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  ${({ $side }) => ($side === 'left' ? 'left: 0.6rem;' : 'right: 0.6rem;')}
  transform: translateY(-50%);
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(11, 15, 20, 0.55);
  color: #ffffff;
  cursor: pointer;
  transition: background var(--dur-fast) var(--ease), opacity var(--dur-fast) var(--ease);

  &:hover {
    background: rgba(11, 15, 20, 0.8);
  }

  &:disabled {
    opacity: 0;
    pointer-events: none;
  }
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  padding: 0.85rem 0 0.15rem;
`;

const Dot = styled.button`
  width: ${({ $active }) => ($active ? '8px' : '6px')};
  height: ${({ $active }) => ($active ? '8px' : '6px')};
  border-radius: 50%;
  border: none;
  padding: 0;
  cursor: pointer;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.accentA : theme.colors.borderStrong};
  transition: background var(--dur-fast) var(--ease), width var(--dur-fast) var(--ease),
    height var(--dur-fast) var(--ease);
`;

const Caption = styled.figcaption`
  padding: 0.75rem 1rem 0.9rem;
  font-size: 0.78rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textDim};
  max-width: none;
`;

const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
`;

// images: [{ src, alt, caption }]. Renders a single framed figure when
// there is only one, since arrows and dots would just be clutter with
// nothing to navigate to.
export default function ProjectGallery({ images }) {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const active = images[index];
  const multiple = images.length > 1;

  return (
    <Wrap aria-label={multiple ? 'Project image gallery' : undefined}>
      <Viewport>
        <Track $index={index}>
          {images.map((img) => (
            <Slide key={img.src}>
              <img src={img.src} alt={img.alt} loading="lazy" />
            </Slide>
          ))}
        </Track>
        {multiple && (
          <>
            <NavButton
              type="button"
              $side="left"
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              disabled={index === 0}
              aria-label="Previous image"
            >
              <ChevronLeftIcon size={18} />
            </NavButton>
            <NavButton
              type="button"
              $side="right"
              onClick={() => setIndex((i) => Math.min(images.length - 1, i + 1))}
              disabled={index === images.length - 1}
              aria-label="Next image"
            >
              <ChevronRightIcon size={18} />
            </NavButton>
          </>
        )}
      </Viewport>
      {multiple && (
        <Dots role="tablist" aria-label="Choose image">
          {images.map((img, i) => (
            <Dot
              key={img.src}
              type="button"
              role="tab"
              $active={i === index}
              aria-selected={i === index}
              aria-label={`Image ${i + 1} of ${images.length}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </Dots>
      )}
      {multiple && (
        <VisuallyHidden aria-live="polite">
          {`Image ${index + 1} of ${images.length}. ${active.caption}`}
        </VisuallyHidden>
      )}
      <Caption aria-hidden={multiple}>{active.caption}</Caption>
    </Wrap>
  );
}
