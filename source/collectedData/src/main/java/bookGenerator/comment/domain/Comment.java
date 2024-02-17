package bookGenerator.comment.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.PostPersist;
import javax.persistence.PostRemove;
import javax.persistence.PostUpdate;
import javax.persistence.Table;

import org.springframework.beans.BeanUtils;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.PrePersist;
import javax.persistence.PreRemove;
import javax.persistence.PreUpdate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import bookGenerator.BootApplication;
import bookGenerator._global.infra.LoggedEntity;

@Data
@EqualsAndHashCode(callSuper=false)
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "App_Comment")
public class Comment extends LoggedEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

	private Long commentId;

	private Long createrId;

	private Long bookId;

	private String content;

    private Date createdDate;
    
    private Date updatedDate;


    public static CommentRepository repository() {
        return BootApplication.applicationContext.getBean(
            CommentRepository.class
        );
    }

    public static Comment createWithObject(Object source) {
        Comment commentToCreate = (new Comment());

        BeanUtils.copyProperties(source, commentToCreate);
        commentToCreate.setCommentId(commentToCreate.getId());
        commentToCreate.setId(null);
        
        return commentToCreate;
    }

    public Comment copyAllProperties(Object source) {
        BeanUtils.copyProperties(source, this, "id", "commentId");
        return this;
    }


    @PrePersist
    public void onPrePersist() {super.onPrePersist();}

    @PostPersist
    public void onPostPersist() {super.onPostPersist();}

    @PreUpdate
    public void onPreUpdate() {super.onPreUpdate();}

    @PostUpdate
    public void onPostUpdate() {super.onPostUpdate();}
    
    @PreRemove
    public void onPreRemove() {super.onPreRemove();}

    @PostRemove
    public void onPostRemove() {super.onPostRemove();}
}
