package bookGenerator.problem.domain;

import java.util.Optional;
import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "problems", path = "problems")
public interface ProblemRepository
    extends PagingAndSortingRepository<Problem, Long> {
    Optional<Problem> findByProblemId(Long problemId);
    List<Problem> findByIndexIdOrderByPriority(Long indexId);
}
