import styles from './VerticalTag.module.scss';

export default function VerticalTag() {
  return (
    <div id="awwwards" className={styles.awwwards}>
      <a
        href="https://www.awwwards.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg width="53.08" height="171.358" viewBox="0 0 53.08 171.358">
          <path fill="white" d="M0 0h53.08v171.358H0z"></path>
          <g fill="black">
            {/* Isi SVG bisa kamu isi sesuai kebutuhan */}
          </g>
        </svg>
      </a>
    </div>
  );
}

